import { Player } from "@types";
import { Icon } from "@components";
import { DEFAULT_PAGE } from "@constants";
import { useStores } from "@stores";
import { observer } from "mobx-react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

interface PlayersListProps {
  players: Player[];
  title?: string;
  disableSearch?: boolean;
  className?: string;
  emptyListMessage?: string;
  paginationControls?: PaginationControlsProps;
  searchTerm?: string;
  setSearchTerm?: (newSearchTerm: string) => void;
  onPLayerClick?: (player: Player) => void;
}

interface PlayersListItemProps {
  player: Player;
  isFavorite: boolean;
  onFavoritesClick: (player: Player) => void;
}

const PlayersList = observer((props: PlayersListProps) => {
  const {
    players,
    title,
    disableSearch,
    emptyListMessage,
    paginationControls,
    searchTerm,
    setSearchTerm,
  } = props;
  const withSearch = !!setSearchTerm && searchTerm !== undefined;
  const { favoritesStore } = useStores();

  const onTypingSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    withSearch && setSearchTerm(e.target.value);
  };

  const onFavoritesClick = (player: Player) => {
    const isFavorite = favoritesStore.isFavorite(player.id);
    isFavorite ? favoritesStore.remove(player) : favoritesStore.add(player);
  };

  return (
    <div className="flex flex-1 flex-col p-4 space-y-2 bg-slate-400 border rounded-md">
      {title && <div className="text-xl font-bold">{title}</div>}
      {withSearch && (
        <input
          disabled={disableSearch}
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={onTypingSearch}
          className="mb-4 p-2 border rounded-md"
        />
      )}
      <div className="flex-1 overflow-y-auto space-y-2 bg-white p-2 rounded-md">
        {emptyListMessage ? (
          <div>{emptyListMessage}</div>
        ) : (
          players.map((player) => (
            <PlayerListItem
              key={player.id}
              player={player}
              onFavoritesClick={onFavoritesClick}
              isFavorite={favoritesStore.isFavorite(player.id)}
            />
          ))
        )}
      </div>
      {paginationControls && <PaginationControls {...paginationControls} />}
    </div>
  );
});

const PaginationControls = (props: PaginationControlsProps) => {
  const { page, totalPages, onNext, onPrev } = props;
  const showNext = page < totalPages;
  const showPrev = page > DEFAULT_PAGE;

  return (
    <div className="flex space-x-4 mx-auto">
      {showPrev && (
        <button onClick={onPrev}>
          <Icon name="arrow_left_alt" />
        </button>
      )}
      <div className="">
        {page} / {totalPages}
      </div>
      {showNext && (
        <button onClick={onNext}>
          <Icon name="arrow_right_alt" />
        </button>
      )}
    </div>
  );
};

const PlayerListItem = (props: PlayersListItemProps) => {
  const { player, onFavoritesClick, isFavorite } = props;

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold"></div>
          <PlayerDataRow
            label="Name"
            value={`${player.first_name} ${player.last_name}`}
          />
          <PlayerDataRow label="Team" value={player.team.full_name} />
          <PlayerDataRow label="Position" value={player.position} />
          {player.height_feet && (
            <PlayerDataRow label="Height" value={`${player.height_feet} ft`} />
          )}
        </div>
        <button
          onClick={() => onFavoritesClick(player)}
          aria-label="Toggle Favorite"
        >
          <Icon name={isFavorite ? "heart_check" : "favorite"} />
        </button>
      </div>
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
