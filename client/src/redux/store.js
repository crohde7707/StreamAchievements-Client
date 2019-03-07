import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import profileReducer from "./profile-reducer";

const store = createStore(
	profileReducer,
	applyMiddleware(thunk)
);

export default store;