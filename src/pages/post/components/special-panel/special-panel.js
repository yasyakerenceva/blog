import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
	CLOSE_MODAL,
	openModal,
	removePostAsync,
} from "../../../../store/actions";
import { useServerRequest } from "../../../../hooks";
import { Icon } from "../../../../components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../../../../utils";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../store/selectors";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const requestServer = useServerRequest();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				title: "Удалить статью?",
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() =>
						navigate("/"),
					);
					dispatch(CLOSE_MODAL);
				},

				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className="left-panel">
				{publishedAt && (
					<Icon
						classIcon="fa-calendar-o"
						margin="0 10px 0 0"
						size="18px"
						inactive={true}
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="right-panel">
					{editButton}
					{publishedAt && (
						<Icon
							classIcon="fa-trash-o"
							margin="0 0 0 15px"
							size="18px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	& .left-panel {
		display: flex;
		align-items: center;
		font-size: 18px;
	}

	& .right-panel {
		display: flex;
		align-items: center;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
