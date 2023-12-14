import PlayersList from "./PlayersList";
import { useStores } from "@stores";
import { observer } from "mobx-react";
import { useState } from "react";

interface FavoritePlayersProps {}

const getEmptyListMessage = (term: string, isEmpty: boolean) => {
  if (!isEmpty) return "";

  return term
    ? `No favorites players with the name "${term}" yet!`
    : "No favorites players yet!";
};

const FavoritePlayers = observer((props: FavoritePlayersProps) => {
  const { favoritesStore } = useStores();
  const [term, setTerm] = useState("");

  const allFavorites = favoritesStore.players().filter((player) => {
    return `${player.first_name} ${player.last_name}`
      .toLowerCase()
      .includes(term.toLowerCase());
  });

  const isEmpty = allFavorites.length === 0;

  return (
    <PlayersList
      disableSearch={isEmpty && term === ""}
      searchTerm={term}
      setSearchTerm={setTerm}
      players={allFavorites}
      onPLayerClick={favoritesStore.remove}
      emptyListMessage={getEmptyListMessage(term, isEmpty)}
    />
  );
});

export default FavoritePlayers;
