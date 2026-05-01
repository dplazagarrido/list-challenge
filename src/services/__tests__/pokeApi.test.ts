import axios from 'axios';
import { fetchAllPokeData } from '../pokeApi';
import { describe, expect, jest, it, beforeEach } from '@jest/globals';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPokemonResponse = {
  data: {
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  },
};

const mockMovesResponse = {
  data: {
    results: [
      { name: 'pound', url: 'https://pokeapi.co/api/v2/move/1/' },
    ],
  },
};

const mockItemsResponse = {
  data: {
    results: [
      { name: 'master-ball', url: 'https://pokeapi.co/api/v2/item/1/' },
    ],
  },
};

describe('fetchAllPokeData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe combinar los resultados de los 3 endpoints', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockPokemonResponse);
    mockedAxios.get.mockResolvedValueOnce(mockMovesResponse);
    mockedAxios.get.mockResolvedValueOnce(mockItemsResponse);

    const result = await fetchAllPokeData();

    expect(result).toHaveLength(4);
  });

  it('debe asignar el tipo correcto a cada item', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockPokemonResponse);
    mockedAxios.get.mockResolvedValueOnce(mockMovesResponse);
    mockedAxios.get.mockResolvedValueOnce(mockItemsResponse);

    const result = await fetchAllPokeData();

    const pokemon = result.filter(i => i.type === 'pokemon');
    const moves = result.filter(i => i.type === 'move');
    const items = result.filter(i => i.type === 'item');

    expect(pokemon).toHaveLength(2);
    expect(moves).toHaveLength(1);
    expect(items).toHaveLength(1);
  });

  it('debe llamar a los 3 endpoints correctos', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockPokemonResponse);
    mockedAxios.get.mockResolvedValueOnce(mockMovesResponse);
    mockedAxios.get.mockResolvedValueOnce(mockItemsResponse);

    await fetchAllPokeData();

    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=1302');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/move?limit=920');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/item?limit=700');
  });

  it('debe propagar el error si falla algún endpoint', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchAllPokeData()).rejects.toThrow('Network Error');
  });
});