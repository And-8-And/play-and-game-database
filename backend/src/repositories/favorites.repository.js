import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export class JsonFavoritesRepository {
  #filePath;

  constructor(filePath) {
    this.#filePath = filePath;
  }

  async findAll() {
    try {
      return JSON.parse(await readFile(this.#filePath, 'utf-8'));
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  }

  async exists(id) {
    const items = await this.findAll();
    return items.some((item) => item.id === id);
  }

  async add(game) {
    const items = await this.findAll();
    if (items.some((item) => item.id === game.id)) return game;
    await this.#save([game, ...items]);
    return game;
  }

  async remove(id) {
    const items = await this.findAll();
    await this.#save(items.filter((item) => item.id !== id));
  }

  async #save(items) {
    await mkdir(path.dirname(this.#filePath), { recursive: true });
    await writeFile(this.#filePath, JSON.stringify(items, null, 2));
  }
}