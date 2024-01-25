import { useEffect, useState } from "react";
import { useServerRequest } from "../../hooks";
import { Content, Title } from "../../components";
import { TableRow, UserRow } from "./components";
import { ROLE } from "../../constants";
import styled from "styled-components";

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([
			requestServer("fetchUsers"),
			requestServer("fetchRoles"),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [requestServer, shouldUpdateUsers]);

	const onUserRemove = (userId) => {
		requestServer("removeUser", userId).then(() => {
			setShouldUpdateUsers(!shouldUpdateUsers);
		});
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<Title mt="60px">Пользователи</Title>
				<div className="table">
					<TableRow>
						<div className="login-col">Логин</div>
						<div className="registered-at-col">
							Дата регистрации
						</div>
						<div className="role-col">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id }) => Number(id) !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</Content>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > .table {
		width: 570px;
		margin-top: 30px;
		font-size: 18px;
	}
`;
