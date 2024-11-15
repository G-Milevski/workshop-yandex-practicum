import { HTTPTransport } from "../core/httpTransport";
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from "./type";

const authApi = new HTTPTransport('/auth');

const delay = (showError) => new Promise((resolve, reject) => {
    if(showError) {
        setTimeout(() => reject(), 2000)
    } else {
        setTimeout(() => resolve(), 3000)
    }
})

export default class AuthApi {
    async create(data: CreateUser): Promise<SignUpResponse> {
        return authApi.post<SignUpResponse>('/signup', {data})
    }

    async login(data: LoginRequestData): Promise<void | APIError> {
        // return authApi.post('/signin', {data});
        return await delay(data.login === 'httperror')
    }

    async me(): Promise<UserDTO | APIError> {
        return authApi.get('/user');
    }

    async logout(): Promise<void | APIError> {
        return authApi.post('/logout')
    }
}