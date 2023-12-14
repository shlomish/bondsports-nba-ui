import {
  makeAutoObservable,
  action,
  computed,
  reaction,
  observable,
} from "mobx";
import { Player } from "@types";

type FavoritesMap = { [key: number]: Player };

export class FavoritesStore {
  @observable favoritePlayers: FavoritesMap = {};

  constructor() {
    makeAutoObservable(this, {
      add: action.bound,
      remove: action.bound,
      isFavorite: action.bound,
    });

    this.loadFavorites();

    reaction(
      () => this.favoritePlayers,
      (favoritePlayers) => {
        localStorage.setItem(
          "favoritePlayers",
          JSON.stringify(favoritePlayers)
        );
      }
    );
  }

  @computed
  players() {
    return Object.values(this.favoritePlayers);
  }

  add(player: Player) {
    this.favoritePlayers[player.id] = player;
  }

  remove(player: Player) {
    delete this.favoritePlayers[player.id];
  }

  isFavorite(playerId: number) {
    return playerId in this.favoritePlayers;
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem("favoritePlayers");
    if (storedFavorites) {
      this.favoritePlayers = JSON.parse(storedFavorites);
    }
  }
}
