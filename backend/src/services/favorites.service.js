export class FavoritesService {
  #repository;
  #gamesService;

  constructor(repository, gamesService) {
    this.#repository = repository;
    this.#gamesService = gamesService;
  }

  list() {
    return this.#repository.findAll();
  }

  async add(gameId) {
    const summary = await this.#gamesService.getSummary(gameId);
    return this.#repository.add(summary);
  }

  remove(gameId) {
    return this.#repository.remove(gameId);
  }
}