const names = (items = []) => items.map((item) => item.name);

export const toGameSummary = (raw) => ({
  id: raw.id,
  slug: raw.slug,
  name: raw.name,
  cover: raw.background_image ?? null,
  released: raw.released ?? null,
  rating: raw.rating ?? 0,
  ratingsCount: raw.ratings_count ?? 0,
  metacritic: raw.metacritic ?? null,
  platforms: (raw.platforms ?? []).map(({ platform }) => platform.name),
  genres: names(raw.genres),
  ageRating: raw.esrb_rating?.name ?? null,
});

const toSystemRequirements = (platforms = []) =>
  platforms
    .filter(({ requirements }) => requirements && Object.keys(requirements).length > 0)
    .map(({ platform, requirements }) => ({
      platform: platform.name,
      minimum: requirements.minimum ?? null,
      recommended: requirements.recommended ?? null,
    }));

const toReviews = (raw) => ({
  ratings: (raw.ratings ?? []).map(({ id, title, count, percent }) => ({ id, title, count, percent })),
  ratingsCount: raw.ratings_count ?? 0,
  textReviewsCount: raw.reviews_text_count ?? 0,
  metacritic: raw.metacritic ?? null,
  metacriticPlatforms: (raw.metacritic_platforms ?? []).map(({ metascore, url, platform }) => ({
    platform: platform?.name ?? null,
    score: metascore,
    url,
  })),
  redditUrl: raw.reddit_url || null,
});

export const toGameDetails = (raw, screenshots = []) => ({
  ...toGameSummary(raw),
  description: raw.description_raw ?? '',
  website: raw.website || null,
  developers: names(raw.developers),
  publishers: names(raw.publishers),
  screenshots: screenshots.map((shot) => shot.image),
  systemRequirements: toSystemRequirements(raw.platforms),
  reviews: toReviews(raw),
});

export const toPage = (raw, { page, pageSize }) => ({
  count: raw.count,
  page,
  pageSize,
  hasNext: Boolean(raw.next),
  results: raw.results.map(toGameSummary),
});