import cookie from 'cookie';
import axios from 'axios';

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