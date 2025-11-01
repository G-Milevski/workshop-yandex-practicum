import AuthApi from "../api/auth";
import { ROUTER } from "../constants";

const authApi = new AuthApi();

export const login = async (model) => {
  window.store.set({ isLoading: true });
  try {
    await authApi.login(model);
    window.router.go(ROUTER.cats);
  } catch (responsError) {
    const error = await responsError.json();
    window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const checkLoginUser = async () => {
  window.store.set({ isLoading: true });
  try {
    const user = await authApi.me();
    window.router.go(ROUTER.cats);
    window.store.set({ user });
  } catch (responsError) {
    const error = await responsError.json();
    window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};
