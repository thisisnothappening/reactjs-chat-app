import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { User } from "../model/User.ts";

const AuthContext = createContext<{
	user: User | undefined,
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
	token: string,
	setToken: React.Dispatch<React.SetStateAction<string>>,
}>({
	user: undefined,
	setUser: () => { },
	token: "",
	setToken: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | undefined>();
	const [token, setToken] = useState<string>("");
	// token = accessToken

	useEffect(() => {
		axios.get(
			`${process.env.REACT_APP_HOST_NAME}/refresh`,
			{ withCredentials: true }
		)
			.then((res) => {
				const userData = {
                    _id: res.data.id,
                    email: res.data.email,
                    username: res.data.username
                };
                setUser(userData);
                setToken(res.data.accessToken);
                console.log("Logged in user data:", userData);
			})
			.catch(error => {
				console.error(error.response);
			});
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
