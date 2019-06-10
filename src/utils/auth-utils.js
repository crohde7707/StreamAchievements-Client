import cookie from 'cookie';
import axios from 'axios';

let isAuthenticated = () => {
	let cookies = cookie.parse(document.cookie);

	if(cookies.etid) {
		return true;
	}

	return false;
}

let AxiosInstance = (history, method, endpoint, opts) => {
	
	return new Promise((resolve, reject) => {
		if(opts) {
			axios[method](endpoint, opts).then(res => {
				if(res.redirect) {
					history.push('/');
				} else {
					resolve(res);
				}
			})
		} else {
			axios[method](endpoint).then(res => {
				if(res.redirect) {
					history.push('/');
				} else {
					resolve(res);
				}
			})
		}
	});
}

export {
	isAuthenticated,
	AxiosInstance
};