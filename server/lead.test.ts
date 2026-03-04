import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the db module
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
  }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("lead.submit", () => {
  it("accepts a valid lead submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lead.submit({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "5405551234",
      helpType: "buying",
      message: "Looking for a home in Blacksburg",
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts a lead without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lead.submit({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      helpType: "selling",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects a lead with missing first name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        firstName: "",
        lastName: "Doe",
        email: "john@example.com",
        helpType: "buying",
      })
    ).rejects.toThrow();
  });

  it("rejects a lead with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        firstName: "John",
        lastName: "Doe",
        email: "not-an-email",
        helpType: "buying",
      })
    ).rejects.toThrow();
  });

  it("rejects a lead with missing helpType", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        helpType: "",
      })
    ).rejects.toThrow();
  });
});
