import { useState } from "react";

export default function LoginForm({socket}) {
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');

	function login() {
		socket.send(JSON.stringify({action: 'login', data:{user:user, password:password}}));
	}

	return <form id="login-form">
		<input id="username-field" value={user} onChange={(event) => setUser(event.target.value)} type="text" placeholder="username" />
		<input id="password-field" value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="password" />
		<input type="button" onClick={() => login()} value="login" />
	</form>;
}
