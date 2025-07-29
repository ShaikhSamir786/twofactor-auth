import {api} from "./api";

export const register = async (username, password) => {
    return await api.post('/auth/register', {
        username,
        password
    });
}

export const loginUser = async (username, password) => {
    return await api.post('/auth/login', {
        username,
        password
    });
}

export const authstatus = async () => {
    return await api.get('/auth/status');
}

export const logout = async () => {
    return await api.post('/auth/logout', {});
}

export const setup2fa = async () => {
    return await api.post('/auth/2fa/setup', {});
}

export const verify2fa = async (token) => {
    return await api.post('/auth/2fa/verify', {token});
}

export const reset2fa = async (token) => {
    return await api.post('/auth/2fa/reset', {token});
}