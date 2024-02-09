import { deleteUser } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const removeUser = async (userSession, userId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	deleteUser(userId);

	return {
		error: null,
		res: true,
	};
};
