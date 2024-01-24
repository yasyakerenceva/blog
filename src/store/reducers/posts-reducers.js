const initialPostsState = {};

export const postsReducer = (state = initialPostsState, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};
