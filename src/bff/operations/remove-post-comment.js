import { deleteComment, getPost } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";
import { getPostCommentsWithAuthor } from "../utils";

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

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
