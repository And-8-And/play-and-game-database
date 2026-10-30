import { AppError } from '../errors/app-error.js';

const isPresent = (value) => value !== undefined && value !== null && value !== '';

export class RawgClient {
  #baseUrl;
  #apiKey;
  #cache;

  constructor({ baseUrl, apiKey, cache }) {
    this.#baseUrl = baseUrl;
    this.#apiKey = apiKey;
    this.#cache = cache;
  }

  async get(path, params = {}) {
    const url = new URL(`${this.#baseUrl}${path}`);
    Object.entries(params)
      .filter(([, value]) => isPresent(value))
      .forEach(([key, value]) => url.searchParams.set(key, value));

    const cacheKey = url.toString();
    const cached = this.#cache.get(cacheKey);
    if (cached) return cached;

    url.searchParams.set('key', this.#apiKey);
    const response = await fetch(url);

    if (!response.ok) {
      const status = response.status === 404 ? 404 : 502;
      throw new AppError(`RAWG request failed (${response.status})`, status);
    }

    const data = await response.json();
    this.#cache.set(cacheKey, data);
    return data;
  }
}