import cookie from 'cookie';

let isAuthenticated = () => {
	let cookies = cookie.parse(document.cookie);

	if(cookies.id_token) {
		return true;
	}

	return false;
}

export {
	isAuthenticated
};