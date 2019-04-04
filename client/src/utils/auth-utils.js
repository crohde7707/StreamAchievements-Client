import cookie from 'cookie';

let isAuthenticated = () => {
	let cookies = cookie.parse(document.cookie);

	if(cookies.etid) {
		return true;
	}

	return false;
}

export {
	isAuthenticated
};