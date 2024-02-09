import { addComment, getPost } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";
import { getPostCommentsWithAuthor } from "../utils";

export const addPostComment = async (userSession, postId, userId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	await addComment(postId, userId, content);

	const post = await getPost(postId);

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
