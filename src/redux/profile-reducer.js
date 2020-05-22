const SET_PROFILE = 'SET_PROFILE';
const SYNC_TWITCH = 'SYNC_TWITCH';
const SYNC_MIXER = 'SYNC_MIXER';
const SYNC_PATREON = 'SYNC_PATREON';
const SYNC_STREAMLABS = 'SYNC_STREAMLABS';
const UNLINK_SERVICE = 'UNLINK_SERVICE';
const UNLINK_PLATFORM = 'UNLINK_PLATFORM';
const UPDATE_STATUS = 'UPDATE_STATUS';
const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';
const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
const UPDATE_SETUP_STATUS = 'UPDATE_SETUP_STATUS';

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
			let platforms = {};

			if(action.data.platforms.twitch) {
				platforms.twitch = {...action.data.platforms.twitch}
			}

			if(action.data.platforms.mixer) {
				platforms.mixer = {...action.data.platforms.mixer}
			}
			return {
				...state,
				profile: {
					platforms: platforms,
					currentPlatform: action.data.currentPlatform,
					username: action.data.username,
					logo: action.data.logo,
					status: action.data.status,
					type: action.data.type,
					preferences: action.data.preferences,
					unreadNotifications: action.data.notificationCount,
					nid: action.data.uid,
					socket: action.data.socket,
					isMod: action.data.isMod,
					isNew: action.data.new,
					terms: action.data.terms
				},
				patreon: action.data.patreon,
				streamlabs: action.data.streamlabs
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
			break;
		case SYNC_MIXER:
			return {
				...state,
				profile: {
					...state.profile,
					platforms: {
						...state.profile.platforms,
						mixer: {
							...state.profile.platforms.mixer,
							username: action.data.username,
							logo: action.data.logo
						}
					}
				}
			}
		case SYNC_PATREON:
			return {
				...state,
				patreon: action.data
			}
			break;
		case SYNC_STREAMLABS:
			return {
				...state,
				streamlabs: action.data
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
			console.log(action.data);
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
		case UPDATE_SETUP_STATUS:
			return {
				...state,
				profile: {
					...state.profile,
					isNew: action.data.new,
					terms: action.data.terms
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

export function syncPlatform(data, platform) {
	switch(platform) {
		case 'twitch':
			return {
				type: SYNC_TWITCH,
				data
			}
			break;
		case 'mixer':
			return {
				type: SYNC_MIXER,
				data
			}
			break;
		default:
			return {
				type: ''
			}
	}
}

export function syncPatreon(data) {
	return {
		type: SYNC_PATREON,
		data
	};
}

export function syncStreamlabs(data) {
	return {
		type: SYNC_STREAMLABS,
		data
	}
}

export function unlinkService(data) {
	return {
		type: UNLINK_SERVICE,
		data
	};
}

export function unlinkPlatform(data) {
	return {
		type: UNLINK_PLATFORM,
		data
	}
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
	return {
		type: UPDATE_NOTIFICATIONS,
		data
	}
}

export function updateSetupStatus(data) {
	return {
		type: UPDATE_SETUP_STATUS,
		data
	}
}