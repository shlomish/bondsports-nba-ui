import { Player } from "@types";
import { usePlayers } from "@hooks";
import { PlayersList } from "@components";

interface SearchPlayersProps {
  className?: string;
  onPLayerClick?: (player: Player) => void;
}

const SearchPlayers = (props: SearchPlayersProps) => {
  const { className } = props;
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

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <PlayersList
      players={players}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      paginationControls={{
        page,
        totalPages,
        onNext: nextPage,
        onPrev: previousPage,
      }}
    />
  );
};

export default SearchPlayers;
