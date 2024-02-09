import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../../../../hooks";
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from "../../../../../store/actions";
import { selectUserRole } from "../../../../../store/selectors";
import { ROLE } from "../../../../../constants";
import { Icon } from "../../../../../components";
import styled from "styled-components";

const CommentContainer = ({
	className,
	postId,
	id,
	author,
	content,
	publishedAt,
}) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const requestServer = useServerRequest();

	const onCommentRemove = (postId, commentId) => {
		dispatch(
			openModal({
				title: "Удалить комментарий?",
				onConfirm: () => {
					dispatch(
						removeCommentAsync(requestServer, postId, commentId),
					);
					dispatch(CLOSE_MODAL);
				},

				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment-info">
				<div className="information-panel">
					<div className="author">
						<Icon
							classIcon="fa-user-circle-o"
							margin="0 5px 0 0"
							size="18px"
							inactive={true}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							classIcon="fa-calendar-o"
							margin="0 5px 0 0"
							size="18px"
							inactive={true}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					classIcon="fa-trash-o"
					margin="10px 0 0 5px"
					onClick={() => onCommentRemove(postId, id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	margin-top: 18px;
	display: flex;
	align-items: flex-start;

	& .comment-info {
		width: calc(100% - 25px);
		border: 1px solid #000;
		padding: 10px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .comment-text {
		margin-top: 12px;
		font-size: 16px;
	}

	& .author,
	& .published-at {
		display: flex;
		align-items: center;
	}
`;
