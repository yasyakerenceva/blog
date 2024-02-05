import { addPost, updatePost } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const savePost = async (userSession, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	const savedPost =
		newPostData.id === ""
			? await addPost(newPostData)
			: await updatePost(newPostData);

	return {
		error: null,
		res: savedPost,
	};
};
