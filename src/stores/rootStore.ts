import { FavoritesStore } from "./favoritesStore";

class RootStore {
  favoritesStore: FavoritesStore;

  constructor() {
    this.favoritesStore = new FavoritesStore();
  }
}

export const rootStore = new RootStore();
