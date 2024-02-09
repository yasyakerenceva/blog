import { useDispatch, useSelector } from "react-redux";
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from "../../../../store/selectors";
import { logout } from "../../../../store/actions";
import { Link, useNavigate } from "react-router-dom";
import { Button, Icon } from "../../../../components";
import { ROLE } from ".././../../../constants";
import styled from "styled-components";
import { checkAccess } from "../../../../utils";

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const TopRightAligned = styled.div`
	display: flex;
	align-items: center;
	height: 32px;

	& > span {
		margin-right: 10px;
		font-size: 18px;
		font-weight: 700;
	}
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem("userData");
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<TopRightAligned>
						<span>{login}</span>
						<Icon classIcon="fa-sign-out" onClick={onLogout} />
					</TopRightAligned>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					classIcon="fa-backward"
					margin="15px 0 0 0"
					onClick={() => navigate(-1)}
				/>
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon
								classIcon="fa-file-text-o"
								margin="15px 0 0 16px"
							/>
						</Link>
						<Link to="/users">
							<Icon classIcon="fa-users" margin="15px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
