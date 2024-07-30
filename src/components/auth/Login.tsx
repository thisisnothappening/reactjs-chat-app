import axios from "axios";
import React from "react";
import { FC, useEffect, useState } from "react";

type Props = {
	onClickSaveButton: () => void;
}

const Login: FC<Props> = ({ onClickSaveButton }) => {
	const [emailOrUsername, setEmailOrUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const login = () => {
		axios.post(
			`${process.env.REACT_APP_HOST_NAME}/login`,
			{ emailOrUsername: emailOrUsername, password: password },
			{ withCredentials: true }
		)
			.then(() => {
				onClickSaveButton();
				window.location.reload();
			})
			.catch(err => {
				console.error(err.response);
				setError(err.response.data.error || err.response.data.message);
			});
	};

	useEffect(() => {
		setError("");
	}, [emailOrUsername, password]);

	return (
		<div className="Login">
			<form className="login-form">
				<h1>SIGN IN</h1>
				{error && <div className="error">{error}</div>}
				<div className="form-control">
					<input type='text' className="auth-input" placeholder='Email or Username' value={emailOrUsername}
						onChange={(e) => setEmailOrUsername(e.target.value)} />
				</div>
				<div className="form-control">
					<input type='password' className="auth-input" placeholder="Password" value={password}
						onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button className="save" type="button" onClick={() => login()}>SAVE</button>
			</form>
		</div>
	);
};

export default Login;
