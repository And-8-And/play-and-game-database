export class MemoryCache {
  #store = new Map();
  #ttlMs;

  constructor(ttlSeconds) {
    this.#ttlMs = ttlSeconds * 1000;
  }

  get(key) {
    const entry = this.#store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt < Date.now()) {
      this.#store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key, value) {
    this.#store.set(key, { value, expiresAt: Date.now() + this.#ttlMs });
  }
}