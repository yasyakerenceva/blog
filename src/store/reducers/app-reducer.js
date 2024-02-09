import { ACTION_TYPE } from "../type";

const initialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		title: "",
		onConfirm: () => {},
		onCancel: () => {},
	},
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
		case ACTION_TYPE.OPEN_MODAL: {
			return {
				...state,
				modal: {
					...state.modal,
					...payload,
					isOpen: true,
				},
			};
		}
		case ACTION_TYPE.CLOSE_MODAL: {
			return initialAppState;
		}
		default:
			return state;
	}
};
