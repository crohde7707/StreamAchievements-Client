import axios from 'axios';

let authAxios = axios.create({
	withCredentials: true
});

authAxios.isRedirecting = false;

authAxios.interceptors.response.use(response => {
	return response;
}, error => {
	console.log(error.response);
	if (error.response.status === 401) {
		//place your reentry code
		if(!authAxios.isRedirecting) {
			authAxios.isRedirecting = true;
			setTimeout(() => {
				authAxios.isRedirecting = false;
			}, 3000);
		}
  	}

  	return Promise.reject(error);
  	
});

let call = (method, endpoint, parameters, body) => {
	let calledInstance;

	switch(method) {
		case 'get':
			console.log('get');
			calledInstance = authAxios[method](endpoint, parameters);
			break;
		case 'put':
			calledInstance = authAxios[method](endpoint, body, parameters);
			break;
		default:
			break;
	}
	
	return new Promise((resolve, reject) => {
		calledInstance.then(response => {
			resolve(response);
		}).catch(err => {
			resolve({error: 'Unauthorized'});
		});
	});
}

export default {
	call
}