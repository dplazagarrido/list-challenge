import axios from "axios";
import { PokeItem } from "../types";
import config from "../constants/config";

const BASE_URL = config.API_URL;

export const fetchAllPokeData = async (): Promise<PokeItem[]> => {
  const [pokemon, moves, items] = await Promise.all([
    axios.get(`${BASE_URL}/pokemon?limit=1350`),
    axios.get(`${BASE_URL}/move?limit=920`),
    axios.get(`${BASE_URL}/item?limit=700`),
  ]);

  const allItems: PokeItem[] = [
    ...pokemon.data.results.map((p: Omit<PokeItem, "type">) => ({
      ...p,
      type: "pokemon" as const,
    })),
    ...moves.data.results.map((m: Omit<PokeItem, "type">) => ({
      ...m,
      type: "move" as const,
    })),
    ...items.data.results.map((i: Omit<PokeItem, "type">) => ({
      ...i,
      type: "item" as const,
    })),
  ];

  return allItems;
};
