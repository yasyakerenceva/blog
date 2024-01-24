import { combineReducers } from "redux";
import { userReducer } from "./user-reducer";
import { usersReducer } from "./users-reducers";
import { postReducer } from "./post-reducer";
import { postsReducer } from "./posts-reducers";
import { appReducer } from "./app-reducer";

export const rootReducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
});
