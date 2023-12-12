import { Player } from "../Player";

export interface PlayersResponse {
  data: Player[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
  };
}
