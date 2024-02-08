import AuthApi from "../api/auth";
import { CreateUser, LoginRequestData, UserDTO } from "../api/type";
import { navigate } from "../core/navigate";
import { apiHasError } from '../utils/apiHasError'
import { transformUser } from "../utils/apiTransformers";

const authApi = new AuthApi();

const getUser = async() => {
    const responseUser = await authApi.me();
    if (apiHasError(responseUser)) {
        throw Error(responseUser.reason)
    }

    return transformUser(responseUser as UserDTO);
}

const signin = async (data: LoginRequestData) => {
    const response = await authApi.login(data);
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const me = await getUser();

    window.store.set({user: me});
    navigate('emails')
}

const signup = async (data: CreateUser) => {
    const response = await authApi.create(data);
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const me = await getUser();
    window.store.set({user: me});
    navigate('emails')
}

const logout = async () => {
    await authApi.logout();
    window.store.set({user: null, chats: []});
    navigate('login')
}

export {
    signin,
    signup,
    logout,
    getUser
}