const SET_PROFILE = 'SET_PROFILE';
const SYNC_PATREON = 'SYNC_PATREON';
const UNLINK_SERVICE = 'UNLINK_SERVICE';
const UPDATE_STATUS = 'UPDATE_STATUS';
const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';

let initialState = {
	username: '',
	logo: '',
	status: '',
	type: ''
}

export default function ProfileReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROFILE: 
			console.log(action.data);
			return {
				...state,
				profile: {
					username: action.data.username,
					logo: action.data.logo,
					status: action.data.status,
					type: action.data.type,
					preferences: action.data.preferences
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
		case UPDATE_STATUS:
			return {
				...state,
				profile: {
					...state.profile,
					status: action.data.status
				}
			}
			break;
		case UPDATE_PREFERENCES:
			return {
				...state,
				profile: {
					...state.profile,
					preferences: action.data.preferences
				}
			}
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

export function updateStatus(data) {
	return {
		type: UPDATE_STATUS,
		data
	}
}

export function updatePreferences(data) {
	return {
		type: UPDATE_PREFERENCES,
		data
	}
}