export type PokeItemType = "pokemon" | "move" | "item";

export interface PokeItem {
  name: string;
  url: string;
  type: PokeItemType;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface PokeState {
  items: PokeItem[];
  isLoading: boolean;
  error: string | null;
}

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};
