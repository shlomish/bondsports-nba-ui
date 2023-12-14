import { PlayersResponse } from "@types";
import { GET_PLAYERS } from "./queryKeys";
import { useQuery } from "react-query";
import { NBA_API } from "@constants";

type PlayersFetchFilters = {
  page?: number;
  perPage?: number;
  search?: string;
};

const fetchNbaPlayers = async (fetchFilters: PlayersFetchFilters) => {
  const { page, perPage, search } = fetchFilters;
  const url = new URL(NBA_API);
  url.searchParams.append("page", String(page));
  url.searchParams.append("per_page", String(perPage));

  if (search && search != "") {
    url.searchParams.append("search", search);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch NBA players");
  }
  return response.json();
};

export const useGetPlayers = (fetchFilters: PlayersFetchFilters) => {
  const { page = 0, perPage = 25, search = "" } = fetchFilters;
  return useQuery<PlayersResponse, Error>(
    [GET_PLAYERS, page, perPage, search], // Assignment note: Instead of caching implementation in the store, I used react-query to cache the data
    () => fetchNbaPlayers(fetchFilters),
    { keepPreviousData: true }
  );
};
