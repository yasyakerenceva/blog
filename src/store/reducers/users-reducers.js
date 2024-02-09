const initialUsersState = {};

export const usersReducer = (state = initialUsersState, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};
