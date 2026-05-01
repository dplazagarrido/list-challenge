import { describe, it, expect } from "@jest/globals";
import authReducer, {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../authSlice";
import { AuthState } from "../../../types";

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

describe("authSlice", () => {
  it("debe retornar el estado inicial", () => {
    expect(authReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("loginStart debe activar isLoading", () => {
    const state = authReducer(initialState, loginStart());
    expect(state.isLoading).toBe(true);
  });

  it("loginSuccess debe autenticar al usuario y guardar el token", () => {
    const token = "mock-token-xyz";
    const state = authReducer(initialState, loginSuccess(token));
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe(token);
    expect(state.isLoading).toBe(false);
  });

  it("loginFailure debe desactivar isLoading", () => {
    const loadingState = { ...initialState, isLoading: true };
    const state = authReducer(loadingState, loginFailure());
    expect(state.isLoading).toBe(false);
  });

  it("logout debe limpiar el token y desautenticar", () => {
    const authenticatedState: AuthState = {
      token: "mock-token-xyz",
      isAuthenticated: true,
      isLoading: false,
    };
    const state = authReducer(authenticatedState, logout());
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
