import { useEffect } from "react";
import { fetchAllPokeData } from "../services/pokeApi";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from "../store/slices/pokeSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const usePokeData = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.poke);

  useEffect(() => {
    if (items.length > 0) return;

    const load = async () => {
      dispatch(fetchStart());
      try {
        const data = await fetchAllPokeData();
        dispatch(fetchSuccess(data));
      } catch (e) {
        dispatch(fetchFailure("Error al cargar los datos"));
      }
    };

    load();
  }, []);

  return { items, isLoading, error };
};
