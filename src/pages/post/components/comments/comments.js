import { useState } from "react";
import { Icon } from "../../../../components";
import { Comment } from "./components";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../../store/selectors";
import { addCommentAsync } from "../../../../store/actions";
import { useServerRequest } from "../../../../hooks";

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState("");
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const requestServer = useServerRequest();

	const onNewCommentAdd = (postId, userId, content) => {
		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment("");
	};

	return (
		<div className={className}>
			<div className="new-comment">
				<textarea
					name="comment"
					value={newComment}
					onChange={({ target }) => setNewComment(target.value)}
					placeholder="Комментарий..."
				></textarea>
				<Icon
					classIcon="fa-paper-plane-o"
					margin="10px 0 0 5px"
					onClick={() => {
						onNewCommentAdd(postId, userId, newComment);
					}}
				/>
			</div>
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 0 auto;
	margin-top: 25px;
	width: 580px;

	& .new-comment {
		display: flex;
		align-items: flex-start;
		height: 120px;

		& textarea {
			font-size: 16px;
			width: calc(100% - 25px);
			height: 100%;
			resize: none;
		}

		& > div {
			font-size: 20px;
		}
	}

	& .comments {
		width: 100%;
	}
`;
