import { ACTION_TYPE } from "../type";

const initialAppState = {
	wasLogout: false,
};

export const appReducer = (state = initialAppState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.LOGOUT: {
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		}
		default:
			return state;
	}
};
