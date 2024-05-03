import AuthApi from "../api/auth";

const authApi = new AuthApi();

export const login = async (model) => {
    window.store.set({isLoading: true});
    try {
        await authApi.login(model);
        window.router.go('/cats')
        
    } catch (error) {
        window.store.set({loginError: 'some error'});
    } finally {
        window.store.set({isLoading: false});
    }

}