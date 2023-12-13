import { Player } from "@types";
import { usePlayers } from "@hooks";
import { Icon } from "@components";

interface PlayersListProps {
  className?: string;
  onPLayerClick?: (player: Player) => void;
}

interface PlayersListItemProps {
  player: Player;
}

const PlayersList = (props: PlayersListProps) => {
  const { className } = props;
  const {
    players,
    isLoading,
    error,
    page,
    totalPages,
    searchTerm,
    canGoNext,
    canGoPrevious,
    setSearchTerm,
    nextPage,
    previousPage,
  } = usePlayers();

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={`flex flex-col p-4 space-y-2 bg-slate-400 ${className}`}>
      <input
        type="text"
        placeholder="Search players"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded-md"
      />
      <div className="space-y-2 overflow-y-auto">
        {players &&
          players.map((player) => (
            <PlayerListItem key={player.id} player={player} />
          ))}
      </div>
      <div className="flex">
        {canGoPrevious && (
          <button onClick={previousPage}>
            <Icon name="arrow_left_alt" />
          </button>
        )}
        <div className="flex-1 text-center">
          {page} / {totalPages}
        </div>
        {canGoNext && (
          <button onClick={nextPage}>
            <Icon name="arrow_right_alt" />
          </button>
        )}
      </div>
    </div>
  );
};

const PlayerListItem = (props: PlayersListItemProps) => {
  const { player } = props;

  return (
    <div className="bg-gray-200 p-4 rounded-md cursor-pointer">
      <div className="font-bold"></div>
      <PlayerDataRow
        label="Name"
        value={`${player.first_name} ${player.last_name}`}
      />
      <PlayerDataRow label="Team" value={player.team.full_name} />
      <PlayerDataRow label="Position" value={player.position} />
      {player.height_feet && (
        <PlayerDataRow label="Hight" value={player.height_feet} />
      )}
    </div>
  );
};

const PlayerDataRow = (props: { label: string; value: string | number }) => {
  const { label, value } = props;

  return (
    <div className="flex mb-2">
      <div className="font-bold">{label}</div>
      {":"}
      <div className="text-gray-500 ml-2">{value}</div>
    </div>
  );
};

export default PlayersList;
