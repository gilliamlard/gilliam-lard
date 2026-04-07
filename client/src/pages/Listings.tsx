/**
 * Listings — Home search results within 30-min drive of Dublin, VA
 * Price: $150K–$270K | Lot: 1+ acre
 * Sortable comparison table pulling from Redfin, Zillow & Trulia
 */

import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Listing } from "../../../server/listings";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortKey = "price" | "beds" | "baths" | "sqft" | "acres" | "daysOnMarket";
type SortDir = "asc" | "desc";

const SOURCE_COLORS: Record<Listing["source"], string> = {
  redfin: "bg-red-100 text-red-700 border-red-200",
  zillow: "bg-blue-100 text-blue-700 border-blue-200",
  trulia: "bg-green-100 text-green-700 border-green-200",
};

const SOURCE_LABELS: Record<Listing["source"], string> = {
  redfin: "Redfin",
  zillow: "Zillow",
  trulia: "Trulia",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number | null, prefix = "", suffix = "") {
  if (n === null) return "—";
  return `${prefix}${n.toLocaleString()}${suffix}`;
}

function fmtPrice(n: number) {
  return `$${(n / 1000).toFixed(0)}K`;
}

// ─── Sort header ──────────────────────────────────────────────────────────────

function SortHead({
  col,
  label,
  sortKey,
  sortDir,
  onSort,
}: {
  col: SortKey;
  label: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (k: SortKey) => void;
}) {
  const active = col === sortKey;
  return (
    <TableHead
      className={cn(
        "cursor-pointer select-none hover:text-foreground transition-colors",
        active ? "text-[#8b1a1a]" : "text-muted-foreground"
      )}
      onClick={() => onSort(col)}
    >
      <span className="flex items-center gap-1">
        {label}
        <span className="text-[10px] leading-none">
          {active ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
        </span>
      </span>
    </TableHead>
  );
}

// ─── Source status bar ────────────────────────────────────────────────────────

function SourceStatus({
  sources,
  searchLinks,
}: {
  sources: {
    redfin: { count: number; error: string | null };
    zillow: { count: number; error: string | null };
    trulia: { count: number; error: string | null };
  };
  searchLinks: { redfin: string; zillow: string; trulia: string };
}) {
  const items = (
    [
      ["redfin", "Redfin", sources.redfin, searchLinks.redfin],
      ["zillow", "Zillow", sources.zillow, searchLinks.zillow],
      ["trulia", "Trulia", sources.trulia, searchLinks.trulia],
    ] as [
      Listing["source"],
      string,
      { count: number; error: string | null },
      string,
    ][]
  ).map(([src, label, info, link]) => (
    <div key={src} className="flex items-center gap-2 text-sm">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border",
          SOURCE_COLORS[src]
        )}
      >
        {label}
        {info.error ? (
          <span className="opacity-60">✕ blocked</span>
        ) : (
          <span className="font-semibold">{info.count} results</span>
        )}
      </span>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
      >
        open search ↗
      </a>
    </div>
  ));

  return <div className="flex flex-wrap gap-3">{items}</div>;
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Listings() {
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [sourceFilter, setSourceFilter] = useState<Set<Listing["source"]>>(
    new Set(["redfin", "zillow", "trulia"])
  );

  const { data, isLoading, error, refetch, isFetching } =
    trpc.listings.search.useQuery(undefined, {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 min
    });

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function toggleSource(src: Listing["source"]) {
    setSourceFilter(prev => {
      const next = new Set(prev);
      if (next.has(src)) {
        if (next.size > 1) next.delete(src); // keep at least one
      } else {
        next.add(src);
      }
      return next;
    });
  }

  const listings = useMemo(() => {
    if (!data?.listings) return [];

    const filtered = data.listings.filter(l => sourceFilter.has(l.source));

    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? (sortDir === "asc" ? Infinity : -Infinity);
      const bv = b[sortKey] ?? (sortDir === "asc" ? Infinity : -Infinity);
      return sortDir === "asc"
        ? (av as number) - (bv as number)
        : (bv as number) - (av as number);
    });
  }, [data, sortKey, sortDir, sourceFilter]);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-border/40 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-[#2c2c2c]">
              Homes Near Dublin, VA
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Within 30-min drive · $150K–$270K · 1+ acre lot
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              className="text-xs"
            >
              {isFetching ? "Refreshing…" : "Refresh"}
            </Button>
            <a href="/">
              <Button variant="ghost" size="sm" className="text-xs">
                ← Back
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Source filters + status */}
        {data && (
          <div className="bg-white rounded-xl border border-border/40 p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Sources
              </span>
              {(["redfin", "zillow", "trulia"] as Listing["source"][]).map(
                src => (
                  <button
                    key={src}
                    onClick={() => toggleSource(src)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium border transition-opacity",
                      SOURCE_COLORS[src],
                      !sourceFilter.has(src) && "opacity-30"
                    )}
                  >
                    {SOURCE_LABELS[src]}
                  </button>
                )
              )}
              <span className="ml-auto text-sm text-muted-foreground">
                Showing{" "}
                <strong className="text-foreground">{listings.length}</strong>{" "}
                listings
              </span>
            </div>
            <SourceStatus
              sources={data.sources}
              searchLinks={data.searchLinks}
            />
            {(data.sources.redfin.error ||
              data.sources.zillow.error ||
              data.sources.trulia.error) && (
              <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2.5 border border-amber-200">
                Some sources returned errors (common due to bot-protection). Use the
                "open search" links above to browse those sites directly. Results
                shown are from sources that responded successfully.
              </p>
            )}
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 font-medium">Failed to load listings</p>
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="mt-3"
            >
              Try again
            </Button>
          </div>
        )}

        {/* Table */}
        {!isLoading && listings.length > 0 && (
          <div className="bg-white rounded-xl border border-border/40 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-muted-foreground">Address</TableHead>
                  <SortHead
                    col="price"
                    label="Price"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortHead
                    col="beds"
                    label="Beds"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortHead
                    col="baths"
                    label="Baths"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortHead
                    col="sqft"
                    label="Sq Ft"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortHead
                    col="acres"
                    label="Acres"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortHead
                    col="daysOnMarket"
                    label="Days"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <TableHead className="text-muted-foreground">Source</TableHead>
                  <TableHead className="text-muted-foreground">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map(listing => (
                  <TableRow
                    key={listing.id}
                    className="group hover:bg-[#fdf9f4] transition-colors"
                  >
                    <TableCell className="max-w-[200px]">
                      <div className="font-medium text-[#2c2c2c] truncate">
                        {listing.address}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {listing.city}
                        {listing.state ? `, ${listing.state}` : ""}
                        {listing.zip ? ` ${listing.zip}` : ""}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-[#8b1a1a]">
                        {listing.price
                          ? `$${listing.price.toLocaleString()}`
                          : "—"}
                      </span>
                      {listing.price && (
                        <span className="text-xs text-muted-foreground ml-1">
                          ({fmtPrice(listing.price)})
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {fmt(listing.beds)}
                    </TableCell>
                    <TableCell className="text-center">
                      {fmt(listing.baths)}
                    </TableCell>
                    <TableCell>
                      {fmt(listing.sqft, "", " sf")}
                    </TableCell>
                    <TableCell>
                      {listing.acres !== null ? (
                        <span
                          className={cn(
                            "font-medium",
                            listing.acres >= 5 && "text-green-700",
                            listing.acres >= 2 && listing.acres < 5 && "text-emerald-600"
                          )}
                        >
                          {listing.acres.toFixed(2)} ac
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          unknown
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground text-sm">
                      {listing.daysOnMarket !== null
                        ? `${listing.daysOnMarket}d`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
                          SOURCE_COLORS[listing.source]
                        )}
                      >
                        {SOURCE_LABELS[listing.source]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <a
                        href={listing.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#8b1a1a] hover:underline font-medium"
                      >
                        View ↗
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Empty state (after load, no results) */}
        {!isLoading && !error && data && listings.length === 0 && (
          <div className="bg-white rounded-xl border border-border/40 p-12 text-center">
            <p className="text-muted-foreground text-lg">No listings found</p>
            <p className="text-sm text-muted-foreground mt-1">
              All sources may be blocking automated requests. Use the direct
              search links above to browse manually.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {data.searchLinks && (
                <>
                  <a
                    href={data.searchLinks.redfin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      Search Redfin ↗
                    </Button>
                  </a>
                  <a
                    href={data.searchLinks.zillow}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      Search Zillow ↗
                    </Button>
                  </a>
                  <a
                    href={data.searchLinks.trulia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      Search Trulia ↗
                    </Button>
                  </a>
                </>
              )}
            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center pb-4">
          Data pulled live from Redfin, Zillow & Trulia · Sorted by{" "}
          {sortKey} ({sortDir}) · Click any column header to re-sort ·
          Availability subject to change
        </p>
      </div>
    </div>
  );
}
