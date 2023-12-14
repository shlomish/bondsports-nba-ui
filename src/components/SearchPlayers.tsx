import { Player } from "@types";
import { usePlayers } from "@hooks";
import { PlayersList } from "@components";
import { useStores } from "@stores";
import { observer } from "mobx-react";

interface SearchPlayersProps {
  className?: string;
  onPLayerClick?: (player: Player) => void;
}

const SearchPlayers = observer((props: SearchPlayersProps) => {
  const {
    players,
    isLoading,
    page,
    totalPages,
    searchTerm,
    setSearchTerm,
    nextPage,
    previousPage,
  } = usePlayers();
  const { favoritesStore } = useStores();

  return (
    <PlayersList
      disableSearch={isLoading}
      emptyListMessage={isLoading ? "Loading..." : ""}
      players={players}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onPLayerClick={favoritesStore.add}
      paginationControls={{
        page,
        totalPages,
        onNext: nextPage,
        onPrev: previousPage,
      }}
    />
  );
});

export default SearchPlayers;
