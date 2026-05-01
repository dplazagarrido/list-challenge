import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokeItem, PokeState } from '../../types';

const initialState: PokeState = {
  items: [],
  isLoading: false,
  error: null,
};

const pokeSlice = createSlice({
  name: 'poke',
  initialState,
  reducers: {
    fetchStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<PokeItem[]>) {
      state.items = action.payload;
      state.isLoading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = pokeSlice.actions;
export default pokeSlice.reducer;