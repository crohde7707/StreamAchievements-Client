const SET_PROFILE = 'SET_PROFILE';
const SYNC_PATREON = 'SYNC_PATREON';
const UNLINK_SERVICE = 'UNLINK_SERVICE';

let initialState = {
	username: '',
	logo: '',
	status: '',
	type: ''
}

export default function ProfileReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROFILE: 
			return {
				...state,
				profile: {
					username: action.data.username,
					logo: action.data.logo,
					status: action.data.status,
					type: action.data.type
				},
				patreon: action.data.patreon
			}
			break;
		case SYNC_PATREON:
			return {
				...state,
				patreon: action.data
			}
			break;
		case UNLINK_SERVICE:
			let newState = {...state};
			newState[action.data] = false;

			return {
				...newState
			}
			break;
		default:
			return {
				...state
			}
	}
}

export function setProfile(data) {
	return {
		type: SET_PROFILE,
		data
	};
}

export function syncPatreon(data) {
	return {
		type: SYNC_PATREON,
		data
	};
}

export function unlinkService(data) {
	return {
		type: UNLINK_SERVICE,
		data
	};
}