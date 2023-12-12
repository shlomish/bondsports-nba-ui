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
  console.log(url.toString());
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch NBA players");
  }
  return response.json();

  //   return {
  //     data: [
  //       {
  //         id: 14,
  //         first_name: "Ike",
  //         height_feet: null,
  //         height_inches: null,
  //         last_name: "Anigbogu",
  //         position: "C",
  //         team: {
  //           id: 12,
  //           abbreviation: "IND",
  //           city: "Indiana",
  //           conference: "East",
  //           division: "Central",
  //           full_name: "Indiana Pacers",
  //           name: "Pacers",
  //         },
  //         weight_pounds: null,
  //       },
  //       {
  //         id: 25,
  //         first_name: "Ron",
  //         height_feet: null,
  //         height_inches: null,
  //         last_name: "Baker",
  //         position: "G",
  //         team: {
  //           id: 20,
  //           abbreviation: "NYK",
  //           city: "New York",
  //           conference: "East",
  //           division: "Atlantic",
  //           full_name: "New York Knicks",
  //           name: "Knicks",
  //         },
  //         weight_pounds: null,
  //       },
  //       {
  //         id: 47,
  //         first_name: "Jabari",
  //         height_feet: null,
  //         height_inches: null,
  //         last_name: "Bird",
  //         position: "G",
  //         team: {
  //           id: 2,
  //           abbreviation: "BOS",
  //           city: "Boston",
  //           conference: "East",
  //           division: "Atlantic",
  //           full_name: "Boston Celtics",
  //           name: "Celtics",
  //         },
  //         weight_pounds: null,
  //       },
  //     ],
  //   };
};

export const useGetPlayers = (fetchFilters: PlayersFetchFilters) => {
  const { page = 0, perPage = 25, search = "" } = fetchFilters;
  return useQuery<PlayersResponse, Error>(
    [GET_PLAYERS, page, perPage, search],
    () => fetchNbaPlayers(fetchFilters),
    { keepPreviousData: true }
  );
};
