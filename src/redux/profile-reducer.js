const SET_PROFILE = 'SET_PROFILE';
const SYNC_TWITCH = 'SYNC_TWITCH';
const SYNC_PATREON = 'SYNC_PATREON';
const UNLINK_SERVICE = 'UNLINK_SERVICE';
const UPDATE_STATUS = 'UPDATE_STATUS';
const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';
const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
const UPDATE_NEW_STATUS = 'UPDATE_NEW_STATUS';

const axios = require('axios');

let initialState = {
	username: '',
	logo: '',
	status: '',
	type: '',
	isMod: false
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
					type: action.data.type,
					preferences: action.data.preferences,
					unreadNotifications: action.data.notificationCount,
					nid: action.data.uid,
					socket: action.data.socket,
					isMod: action.data.isMod,
					isNew: action.data.new
				},
				patreon: action.data.patreon
			}
			break;
		case SYNC_TWITCH:
			return {
				...state,
				profile: {
					...state.profile,
					username: action.data.username,
					logo: action.data.logo
				}
			}
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
			break;
		case UPDATE_NOTIFICATIONS:
			let countUpdate;

			if(action.data.hasOwnProperty('count')) {
				countUpdate = action.data.count;
			} else {
				countUpdate = state.profile.unreadNotifications + 1
			}
			return {
				...state,
				profile: {
					...state.profile,
					unreadNotifications: countUpdate
				}
			}
			break;
		case UPDATE_NEW_STATUS:
			return {
				...state,
				profile: {
					...state.profile,
					isNew: action.data.new
				}
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

export function syncTwitch(data) {
	return {
		type: SYNC_TWITCH,
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

export function updateNotifications(data) {
	console.log(data);
	return {
		type: UPDATE_NOTIFICATIONS,
		data
	}
}

export function updateNewStatus(data) {
	return {
		type: UPDATE_NEW_STATUS,
		data
	}
}