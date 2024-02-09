import { setUserRole } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}
	setUserRole(userId, newUserRoleId);

	return {
		error: null,
		res: true,
	};
};
