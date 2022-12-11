import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const auth = (header, isLogin) => {
    axios
        .get(`${apiUrl}/users/${isLogin ? 'login' : 'auth'}`, header)
        .then(res => {
            return res.data.user;
        })
        .catch(err => {
            throw new Error(`cannot ${isLogin ? 'login!' : 'verify token!'}`, err);
        });
}

export const verifyToken = (token) => {
    const header = {
        headers: {
            Authorization: token,
        },
    };
    return auth(header, false);
}

export const login = (username, password) => {
    const header = {
        headers: {
            Authorization:
                "Basic " + window.btoa(`${username}:${password}`),
        },
    };
    return auth(header, true);
};
