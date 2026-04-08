/**
 * Home listing scraper for properties within ~30 min drive of Dublin, VA
 * Sources: Redfin, Zillow, Trulia
 * Filters: $150K–$270K, 1+ acre lot
 */

export interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  acres: number | null;
  source: "redfin" | "zillow" | "trulia";
  url: string;
  imageUrl: string | null;
  status: string;
  daysOnMarket: number | null;
}

// Dublin, VA bounding box covering ~30-min drive radius
// Covers: Pulaski Co., SW Montgomery Co., E Giles Co., N Wythe Co.
const BOUNDS = {
  north: 37.38,
  south: 36.88,
  west: -81.10,
  east: -80.35,
};

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Cache-Control": "max-age=0",
};

const JSON_HEADERS = {
  ...BROWSER_HEADERS,
  Accept: "application/json, text/plain, */*",
  Referer: "https://www.redfin.com/",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
};

// ─── Redfin ───────────────────────────────────────────────────────────────────

async function scrapeRedfin(): Promise<Listing[]> {
  // Redfin GIS API polygon: "lng lat,lng lat,..." (space-separated per pair)
  const poly = [
    `${BOUNDS.east} ${BOUNDS.north}`,
    `${BOUNDS.east} ${BOUNDS.south}`,
    `${BOUNDS.west} ${BOUNDS.south}`,
    `${BOUNDS.west} ${BOUNDS.north}`,
    `${BOUNDS.east} ${BOUNDS.north}`,
  ].join(",");

  const params = new URLSearchParams({
    al: "1",
    include_nearby_homes: "true",
    min_price: "150000",
    max_price: "270000",
    num_homes: "350",
    ord: "redfin-recommended-asc",
    page_number: "1",
    poly,
    sf: "1,2,3,5,6,7",
    status: "9",
    uipt: "1,2,3,4,5,6,7,8",
    v: "8",
    min_listing_approx_size: "0",
  });

  const res = await fetch(
    `https://www.redfin.com/stingray/api/gis?${params}`,
    { headers: JSON_HEADERS, signal: AbortSignal.timeout(15000) }
  );

  if (!res.ok) throw new Error(`Redfin HTTP ${res.status}`);

  const text = await res.text();
  // Redfin prefixes response with `{}&&` as CSRF protection
  const json = JSON.parse(text.replace(/^[^{]*/, ""));

  if (json.errorCode !== 0) throw new Error(`Redfin error: ${json.errorMessage}`);

  const homes: unknown[] = json?.payload?.homes ?? [];

  const listings: Listing[] = [];

  for (const h of homes) {
    const home = h as Record<string, unknown>;

    // Lot size in sq ft
    const lotSqFt =
      (home.lotSize as Record<string, number> | undefined)?.value ?? null;
    const acres = lotSqFt ? Math.round((lotSqFt / 43560) * 100) / 100 : null;

    // Skip if less than 1 acre
    if (acres !== null && acres < 1) continue;
    // If lot size unknown, keep it (let user judge)

    const price = (home.price as Record<string, number> | undefined)?.value ?? null;
    if (!price) continue;

    const mlsId =
      (home.mlsId as Record<string, string> | undefined)?.value ?? String(Math.random());
    const urlPath = (home.url as string | undefined) ?? "";

    const address = (home.streetLine as Record<string, string> | undefined)?.value ?? "";
    const city = (home.city as string | undefined) ?? "";
    const state = (home.state as string | undefined) ?? "VA";
    const zip = (home.zip as string | undefined) ?? "";

    listings.push({
      id: `redfin-${mlsId}`,
      address,
      city,
      state,
      zip,
      price,
      beds: (home.beds as number | undefined) ?? null,
      baths: (home.baths as number | undefined) ?? null,
      sqft: (home.sqFt as Record<string, number> | undefined)?.value ?? null,
      acres,
      source: "redfin",
      url: `https://www.redfin.com${urlPath}`,
      imageUrl: (home.primaryPhotoDisplayUrl as string | undefined) ?? null,
      status: (home.listingType as string | undefined) ?? "For Sale",
      daysOnMarket: (home.dom as Record<string, number> | undefined)?.value ?? null,
    });
  }

  return listings;
}

// ─── Zillow ───────────────────────────────────────────────────────────────────

async function scrapeZillow(): Promise<Listing[]> {
  // Zillow search URL with lot size filter (43560 sq ft = 1 acre)
  const searchQueryState = {
    pagination: {},
    isMapVisible: true,
    mapBounds: {
      north: BOUNDS.north,
      south: BOUNDS.south,
      east: BOUNDS.east,
      west: BOUNDS.west,
    },
    filterState: {
      price: { min: 150000, max: 270000 },
      monthlyPayment: { min: 767, max: 1379 },
      lotSize: { min: 43560 },
      isForSaleByAgent: { value: true },
      isForSaleByOwner: { value: true },
      isNewConstruction: { value: true },
      isAuction: { value: false },
      isComingSoon: { value: true },
    },
    isListVisible: true,
  };

  const url = `https://www.zillow.com/homes/for_sale/?searchQueryState=${encodeURIComponent(
    JSON.stringify(searchQueryState)
  )}`;

  const res = await fetch(url, {
    headers: { ...BROWSER_HEADERS },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`Zillow HTTP ${res.status}`);

  const html = await res.text();

  // Extract __NEXT_DATA__ JSON embedded in the page
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
  if (!match) {
    // Try alternative data embedding
    const altMatch = html.match(/window\.__ql\s*=\s*({.+?});\s*<\/script>/s);
    if (!altMatch) throw new Error("Zillow: could not find listing data in page");
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(match![1]);
  } catch {
    throw new Error("Zillow: failed to parse JSON");
  }

  // Navigate to listing results in NEXT_DATA structure
  const searchResults =
    (data?.props as Record<string, unknown>)?.pageProps as Record<string, unknown>;
  const rawListings: unknown[] =
    (searchResults?.searchPageState as Record<string, unknown>)
      ?.cat1 as unknown[] ??
    (searchResults?.searchResults as Record<string, unknown>)
      ?.listResults as unknown[] ??
    [];

  if (!Array.isArray(rawListings)) throw new Error("Zillow: unexpected data shape");

  const listings: Listing[] = [];

  for (const item of rawListings) {
    const h = item as Record<string, unknown>;

    const price = (h.price as number | undefined) ?? (h.unformattedPrice as number | undefined) ?? null;
    if (!price) continue;

    const lotAreaValue = (h.lotAreaValue as number | undefined) ?? null;
    const lotAreaUnit = ((h.lotAreaUnit as string | undefined) ?? "").toLowerCase();

    let acres: number | null = null;
    if (lotAreaValue !== null) {
      if (lotAreaUnit.includes("acre")) {
        acres = Math.round(lotAreaValue * 100) / 100;
      } else if (lotAreaUnit.includes("sqft") || lotAreaUnit.includes("sq")) {
        acres = Math.round((lotAreaValue / 43560) * 100) / 100;
      } else {
        acres = lotAreaValue; // assume acres if no unit
      }
    }

    if (acres !== null && acres < 1) continue;

    const zpid = (h.zpid as string | number | undefined) ?? Math.random();
    const detailUrl = (h.detailUrl as string | undefined) ?? "";
    const address = (h.address as string | undefined) ?? (h.streetAddress as string | undefined) ?? "";
    const splitAddress = address.split(",");

    listings.push({
      id: `zillow-${zpid}`,
      address: splitAddress[0]?.trim() ?? address,
      city: splitAddress[1]?.trim() ?? "",
      state: "VA",
      zip: (h.zipcode as string | undefined) ?? "",
      price,
      beds: (h.beds as number | undefined) ?? null,
      baths: (h.baths as number | undefined) ?? null,
      sqft: (h.area as number | undefined) ?? null,
      acres,
      source: "zillow",
      url: detailUrl.startsWith("http")
        ? detailUrl
        : `https://www.zillow.com${detailUrl}`,
      imageUrl: (h.imgSrc as string | undefined) ?? null,
      status: (h.statusType as string | undefined) ?? "FOR_SALE",
      daysOnMarket: (h.daysOnZillow as number | undefined) ?? null,
    });
  }

  return listings;
}

// ─── Trulia ───────────────────────────────────────────────────────────────────

async function scrapeTrulia(): Promise<Listing[]> {
  // Trulia uses a GraphQL API
  const query = `
    query SearchResultMap($searchType: SearchType!, $filters: FiltersInput!, $sort: SortInput, $pagination: PaginationInput) {
      searchResultMap(searchType: $searchType, filters: $filters, sort: $sort, pagination: $pagination) {
        totalResultCount
        listings {
          id
          url
          price { amount formattedAmount }
          details { beds baths squareFeet lotSize { value unit } }
          location { fullStreet city state zipCode }
          media { heroImage { url } }
          listingStatus
          daysOnMarket
        }
      }
    }
  `;

  const variables = {
    searchType: "FOR_SALE",
    filters: {
      price: { min: 150000, max: 270000 },
      lotSize: { min: 43560 },
      location: {
        bounds: {
          north: BOUNDS.north,
          south: BOUNDS.south,
          east: BOUNDS.east,
          west: BOUNDS.west,
        },
      },
    },
    sort: { type: "PRICE", order: "ASC" },
    pagination: { startIndex: 0, count: 100 },
  };

  const res = await fetch("https://www.trulia.com/graphql", {
    method: "POST",
    headers: {
      ...JSON_HEADERS,
      "Content-Type": "application/json",
      Referer: "https://www.trulia.com/",
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`Trulia HTTP ${res.status}`);

  const data = (await res.json()) as Record<string, unknown>;
  const rawListings: unknown[] =
    ((data?.data as Record<string, unknown>)?.searchResultMap as Record<string, unknown>)
      ?.listings as unknown[] ?? [];

  if (!Array.isArray(rawListings)) throw new Error("Trulia: unexpected response shape");

  const listings: Listing[] = [];

  for (const item of rawListings) {
    const h = item as Record<string, unknown>;
    const price = ((h.price as Record<string, number> | undefined)?.amount) ?? null;
    if (!price) continue;

    const lotSize = (h.details as Record<string, unknown> | undefined)?.lotSize as
      | Record<string, unknown>
      | undefined;
    const lotVal = (lotSize?.value as number | undefined) ?? null;
    const lotUnit = ((lotSize?.unit as string | undefined) ?? "").toLowerCase();

    let acres: number | null = null;
    if (lotVal !== null) {
      if (lotUnit.includes("acre")) {
        acres = Math.round(lotVal * 100) / 100;
      } else if (lotUnit.includes("sq")) {
        acres = Math.round((lotVal / 43560) * 100) / 100;
      }
    }

    if (acres !== null && acres < 1) continue;

    const location = (h.location as Record<string, string> | undefined) ?? {};
    const details = (h.details as Record<string, unknown> | undefined) ?? {};
    const urlPath = (h.url as string | undefined) ?? "";

    listings.push({
      id: `trulia-${h.id ?? Math.random()}`,
      address: (location.fullStreet as string | undefined) ?? "",
      city: (location.city as string | undefined) ?? "",
      state: (location.state as string | undefined) ?? "VA",
      zip: (location.zipCode as string | undefined) ?? "",
      price,
      beds: (details.beds as number | undefined) ?? null,
      baths: (details.baths as number | undefined) ?? null,
      sqft: (details.squareFeet as number | undefined) ?? null,
      acres,
      source: "trulia",
      url: urlPath.startsWith("http") ? urlPath : `https://www.trulia.com${urlPath}`,
      imageUrl:
        ((h.media as Record<string, unknown> | undefined)?.heroImage as
          | Record<string, string>
          | undefined)?.url ?? null,
      status: (h.listingStatus as string | undefined) ?? "FOR_SALE",
      daysOnMarket: (h.daysOnMarket as number | undefined) ?? null,
    });
  }

  return listings;
}

// ─── Public aggregator ────────────────────────────────────────────────────────

export interface ScraperResult {
  listings: Listing[];
  sources: {
    redfin: { count: number; error: string | null };
    zillow: { count: number; error: string | null };
    trulia: { count: number; error: string | null };
  };
  searchLinks: {
    redfin: string;
    zillow: string;
    trulia: string;
  };
}

export async function scrapeListings(): Promise<ScraperResult> {
  // Build canonical search links that open in the browser
  const redfinLink =
    `https://www.redfin.com/homes-for-sale/filter/min-price=150000,max-price=270000,` +
    `min-lot-size=43560sqft/sort=lo-price?boundingBox=${BOUNDS.south},${BOUNDS.west},${BOUNDS.north},${BOUNDS.east}`;

  const zillowSqs = encodeURIComponent(
    JSON.stringify({
      pagination: {},
      isMapVisible: false,
      mapBounds: {
        north: BOUNDS.north,
        south: BOUNDS.south,
        east: BOUNDS.east,
        west: BOUNDS.west,
      },
      filterState: {
        price: { min: 150000, max: 270000 },
        lotSize: { min: 43560 },
      },
      isListVisible: true,
    })
  );
  const zillowLink = `https://www.zillow.com/homes/for_sale/?searchQueryState=${zillowSqs}`;

  const truliaLink =
    `https://www.trulia.com/for_sale/Dublin,VA/map/` +
    `PRICE_RANGE_150000_270000,LOT_SIZE_MIN_43560_sqft/`;

  const [redfinResult, zillowResult, truliaResult] = await Promise.allSettled([
    scrapeRedfin(),
    scrapeZillow(),
    scrapeTrulia(),
  ]);

  const redfinListings = redfinResult.status === "fulfilled" ? redfinResult.value : [];
  const zillowListings = zillowResult.status === "fulfilled" ? zillowResult.value : [];
  const truliaListings = truliaResult.status === "fulfilled" ? truliaResult.value : [];

  // Deduplicate by address (rough match)
  const seen = new Set<string>();
  const all: Listing[] = [];

  for (const listing of [...redfinListings, ...zillowListings, ...truliaListings]) {
    const key = `${listing.address.toLowerCase().replace(/\s+/g, "")}-${listing.price}`;
    if (!seen.has(key)) {
      seen.add(key);
      all.push(listing);
    }
  }

  // Sort by price ascending
  all.sort((a, b) => a.price - b.price);

  return {
    listings: all,
    sources: {
      redfin: {
        count: redfinListings.length,
        error:
          redfinResult.status === "rejected"
            ? String(redfinResult.reason)
            : null,
      },
      zillow: {
        count: zillowListings.length,
        error:
          zillowResult.status === "rejected"
            ? String(zillowResult.reason)
            : null,
      },
      trulia: {
        count: truliaListings.length,
        error:
          truliaResult.status === "rejected"
            ? String(truliaResult.reason)
            : null,
      },
    },
    searchLinks: {
      redfin: redfinLink,
      zillow: zillowLink,
      trulia: truliaLink,
    },
  };
}
