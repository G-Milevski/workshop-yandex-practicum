import { authAPI } from '../api/auth';
import { UserDTO } from '../api/types';
import type { Dispatch } from '../core/Store';
import { AppState } from '../store';
import { transformUser, apiHasError } from '../utils';

type LoginPayload = {
  login: string;
  password: string;
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
  // dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('#home');
};

export const logout = async (dispatch: Dispatch<AppState>) => {

  await authAPI.logout();

  dispatch({ user: null });

  window.router.go('#login');
};
