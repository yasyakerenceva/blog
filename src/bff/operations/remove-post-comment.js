import { deleteComment, getComments, getPost } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const removePostComment = async (userSession, postId, commentId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	await deleteComment(commentId);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	};
};
