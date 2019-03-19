const SET_PROFILE = 'SET_PROFILE';

let initialState = {
	username: '',
	logo: ''
}

export default function ProfileReducer(state = initialState, action) {
	console.log(action);
	switch (action.type) {
		case SET_PROFILE: {
			return {
				...state,
				profile: {
					username: action.data.username,
					logo: action.data.logo,
					owner: action.data.owner
				}
			}
		}
	}

	return state;
}

export function setProfile(data) {
	console.log("SetProfile: ");
	console.log(data);
	return {
		type: SET_PROFILE,
		data
	};
}