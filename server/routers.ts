import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";
import { getDb } from "./db";
import { leads } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  lead: router({
    submit: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().optional(),
          helpType: z.string().min(1, "Please select what you need help with"),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Save to database
        const db = await getDb();
        if (db) {
          await db.insert(leads).values({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone || null,
            helpType: input.helpType,
            message: input.message || null,
          });
        }

        // Send notification to owner (Gilliam)
        const helpLabels: Record<string, string> = {
          buying: "Buying a Home",
          selling: "Selling a Home",
          investing: "Real Estate Investing",
          relocating: "Relocating to Virginia",
          other: "Other / General Question",
        };

        const helpLabel = helpLabels[input.helpType] || input.helpType;

        await notifyOwner({
          title: `New Lead: ${input.firstName} ${input.lastName}`,
          content: [
            `**Name:** ${input.firstName} ${input.lastName}`,
            `**Email:** ${input.email}`,
            input.phone ? `**Phone:** ${input.phone}` : null,
            `**Interested In:** ${helpLabel}`,
            input.message ? `**Message:** ${input.message}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        });

        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
