import { Player } from "@types";
import { Icon } from "@components";
import { DEFAULT_PAGE } from "@constants";
import { useState } from "react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

interface PlayersListProps {
  players: Player[];
  className?: string;
  paginationControls?: PaginationControlsProps;
  searchTerm?: string;
  setSearchTerm?: (newSearchTerm: string) => void;
  onPLayerClick?: (player: Player) => void;
}

interface PlayersListItemProps {
  player: Player;
}

const PlayersList = (props: PlayersListProps) => {
  const { players, paginationControls, searchTerm, setSearchTerm } = props;
  const withSearch = !!setSearchTerm && searchTerm !== undefined;

  const onTypingSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    withSearch && setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col flex-grow p-4 space-y-2 bg-slate-400 border rounded-md">
      {withSearch && (
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={onTypingSearch}
          className="mb-4 p-2 border rounded-md"
        />
      )}
      <div className="flex-1 overflow-y-auto space-y-2 bg-white p-2 rounded-md">
        {players.map((player) => (
          <PlayerListItem key={player.id} player={player} />
        ))}
      </div>
      {paginationControls && <PaginationControls {...paginationControls} />}
    </div>
  );
};

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
