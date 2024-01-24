const initialPostState = {};

export const postReducer = (state = initialPostState, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};
