import { PlayersResponse } from "@types";
import { GET_PLAYERS } from "./queryKeys";
import { useQuery } from "react-query";

type PlayersFetchFilters = {
  page?: number;
  perPage?: number;
  search?: string;
};

const BASE_URL = "https://www.balldontlie.io/api/v1/players";

const fetchNbaPlayers = async (fetchFilters: PlayersFetchFilters) => {
  const { page, perPage, search } = fetchFilters;
  const url = new URL(BASE_URL);
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
    [GET_PLAYERS, page, perPage, search],
    () => fetchNbaPlayers(fetchFilters),
    { keepPreviousData: true }
  );
};
