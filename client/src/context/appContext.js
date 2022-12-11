import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, verifyToken } from '../service/authService';

export const appContext = createContext();

const AppContext = ({ children }) => {
	const [token, setToken] = useState(null);
	const [tokenValidUntil, setTokenValidUntil] = useState(null);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
        login();
		setUser(null);
        setTokenValidUntil(null);
        if (token) verifyToken(token);
        if (!token) login(user.username, user.password);
		navigate("/login");
    }, [apiUrl, navigate, token, user.password, user.username]);

	return (
		<appContext.Provider
			value={{
				token,
				setToken,
				tokenValidUntil,
				setTokenValidUntil,
				user,
				setUser,
			}}
		>
			{{ children }}
		</appContext.Provider>
	);
};
