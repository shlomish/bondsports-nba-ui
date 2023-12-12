import { useGetPlayers } from "@api";
import { Player } from "@types";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@constants";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

interface PlayersListProps {
  className?: string;
  onPLayerClick?: (player: Player) => void;
}

interface PlayersListItemProps {
  player: Player;
}

const PlayersList = (props: PlayersListProps) => {
  const { className } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(DEFAULT_PAGE);
  const {
    data: playersRes,
    isLoading,
    error,
  } = useGetPlayers({ page, perPage: DEFAULT_PAGE_SIZE, search: searchTerm });

  const handleSearch = debounce((e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }, 500);

  const onPrev = () => {
    setPage(Math.max(DEFAULT_PAGE, page - 1));
  };

  const onNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    return () => handleSearch.cancel();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={`flex flex-col p-4 space-y-2 ${className}`}>
      <input
        type="text"
        placeholder="Search players"
        onChange={handleSearch}
        className="mb-4 p-2 border rounded-md"
      />
      {page > DEFAULT_PAGE && <button onClick={onPrev}>Previous</button>}
      {playersRes && page < playersRes?.meta.total_pages && (
        <button onClick={onNext}>Next</button>
      )}
      {/* List rendering */}
      {isLoading && <div>Loading...</div>}
      {/* {error && <div>Error: {error.message}</div>} */}
      {playersRes &&
        playersRes.data.map((player) => (
          <PlayerListItem key={player.id} player={player} />
        ))}
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
