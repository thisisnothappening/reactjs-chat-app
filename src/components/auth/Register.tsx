import axios from "axios";
import React from "react";
import { FC, useEffect, useState } from "react";

type Props = {
	onClickSaveButton: () => void;
}

const Register: FC<Props> = ({ onClickSaveButton }) => {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const register = async () => {
		await axios.post(`${process.env.REACT_APP_HOST_NAME}/register`,
			{ email: email, username: username, password: password })
			.then(() => {
				onClickSaveButton();
				login();
			})
			.catch(err => {
				console.error(err.response);
				setError(err.response.data.error || err.response.data.message);
			});
	};

	const login = () => {
		axios.post(
			`${process.env.REACT_APP_HOST_NAME}/login`,
			{ emailOrUsername: email, password: password },
			{ withCredentials: true }
		)
			.then(() => {
				onClickSaveButton();
				window.location.reload();
			})
			.catch(err => {
				console.error(err.response);
			});
	};

	useEffect(() => {
		setError("");
	}, [email, username, password]);

	return (
		<div className="Register">
			<form className="login-form">
				<h1>SIGN UP</h1>
				{error && <div className="error">{error}</div>}
				<div className="form-control">
					<input type='text' className="auth-input" placeholder='Email' value={email}
					onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="form-control">
					<input type='text' className="auth-input" placeholder='Username' value={username}
					onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className="form-control">
					<input type='password' className="auth-input" placeholder="Password" value={password}
					onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button className="save" type="button" onClick={() => register()}>SAVE</button>
			</form>
		</div>
	);
};

export default Register;
