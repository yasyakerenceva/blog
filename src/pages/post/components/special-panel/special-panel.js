import { useDispatch } from "react-redux";
import {
	CLOSE_MODAL,
	openModal,
	removePostAsync,
} from "../../../../store/actions";
import { useServerRequest } from "../../../../hooks";
import { Icon } from "../../../../components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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

	return (
		<div className={className}>
			<div className="left-panel">
				{publishedAt && (
					<Icon
						classIcon="fa-calendar-o"
						margin="0 10px 0 0"
						inactive={true}
					/>
				)}
				{publishedAt}
			</div>
			<div className="right-panel">
				{editButton}
				{publishedAt && (
					<Icon
						classIcon="fa-trash-o"
						margin="0 0 0 15px"
						onClick={() => onPostRemove(id)}
					/>
				)}
			</div>
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

		& > div {
			font-size: 18px;
		}
	}

	& .right-panel {
		display: flex;
		align-items: center;

		& > div {
			font-size: 18px;
		}
	}
`;
