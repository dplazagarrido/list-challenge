import { describe, it, expect } from '@jest/globals';
import pokeReducer, {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from '../pokeSlice';
import { PokeItem, PokeState } from '../../../types';

const initialState: PokeState = {
  items: [],
  isLoading: false,
  error: null,
};

const mockItems: PokeItem[] = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', type: 'pokemon' },
  { name: 'pound', url: 'https://pokeapi.co/api/v2/move/1/', type: 'move' },
  { name: 'master-ball', url: 'https://pokeapi.co/api/v2/item/1/', type: 'item' },
];

describe('pokeSlice', () => {
  it('debe retornar el estado inicial', () => {
    expect(pokeReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('fetchStart debe activar isLoading y limpiar error', () => {
    const stateWithError: PokeState = { ...initialState, error: 'Error previo' };
    const state = pokeReducer(stateWithError, fetchStart());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchSuccess debe guardar los items y desactivar isLoading', () => {
    const loadingState: PokeState = { ...initialState, isLoading: true };
    const state = pokeReducer(loadingState, fetchSuccess(mockItems));
    expect(state.items).toEqual(mockItems);
    expect(state.items).toHaveLength(3);
    expect(state.isLoading).toBe(false);
  });

  it('fetchFailure debe guardar el error y desactivar isLoading', () => {
    const loadingState: PokeState = { ...initialState, isLoading: true };
    const state = pokeReducer(loadingState, fetchFailure('Error al cargar los datos'));
    expect(state.error).toBe('Error al cargar los datos');
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual([]);
  });

  it('los items deben tener el tipo correcto', () => {
    const state = pokeReducer(initialState, fetchSuccess(mockItems));
    expect(state.items[0].type).toBe('pokemon');
    expect(state.items[1].type).toBe('move');
    expect(state.items[2].type).toBe('item');
  });
});