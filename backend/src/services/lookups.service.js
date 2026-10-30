const toOption = ({ id, name, slug }) => ({ id, name, slug });

export class LookupsService {
  #rawgClient;

  constructor(rawgClient) {
    this.#rawgClient = rawgClient;
  }

  async getGenres() {
    const { results } = await this.#rawgClient.get('/genres');
    return results.map(toOption);
  }

  async getPlatforms() {
    const { results } = await this.#rawgClient.get('/platforms/lists/parents');
    return results.map(toOption);
  }

  async searchPublishers(search) {
    if (!search?.trim()) return [];
    const { results } = await this.#rawgClient.get('/publishers', {
      search: search.trim(),
      page_size: 10,
    });
    return results.map(toOption);
  }
}