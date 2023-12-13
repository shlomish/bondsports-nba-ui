import { useState, useEffect, useRef } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@constants";
import { useGetPlayers } from "@api";
import { Player } from "@types";
import debounce from "lodash/debounce";

interface UsePlayers {
  players: Player[];
  isLoading: boolean;
  error: any;
  searchTerm: string;
  page: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  setSearchTerm: (value: string) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export const usePlayers = (): UsePlayers => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const {
    data: playersRes,
    isLoading,
    error,
  } = useGetPlayers({
    page,
    perPage: DEFAULT_PAGE_SIZE,
    search: debouncedSearchTerm,
  });

  const totalPages = playersRes?.meta?.total_pages ?? 0;
  const canGoNext = !!playersRes?.meta?.next_page;
  const canGoPrevious = !!(
    playersRes && playersRes?.meta?.current_page > DEFAULT_PAGE
  );

  const debouncedSearch = useRef(
    debounce((newValue: string) => setDebouncedSearchTerm(newValue), 500)
  ).current;

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const nextPage = () => {
    if (canGoNext) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (canGoPrevious) {
      setPage(Math.max(DEFAULT_PAGE, page - 1));
    }
  };

  return {
    players: playersRes?.data ?? [],
    isLoading,
    error,
    searchTerm,
    page,
    totalPages,
    canGoNext,
    canGoPrevious,
    nextPage,
    previousPage,
    setSearchTerm,
  };
};
