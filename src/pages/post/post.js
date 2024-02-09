import { useEffect, useLayoutEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useServerRequest } from "../../hooks";
import { loadPostAsync, RESET_POST_DATA } from "../../store/actions";
import { selectPost } from "../../store/selectors";
import { ROLE } from "../../constants";
import { Error, PrivateContent } from "../../components";
import { PostContent, PostForm, Comments } from "./components";
import styled from "styled-components";

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = !!useMatch("/post/:id/edit");
	const isCreating = !!useMatch("/post");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [requestServer, dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	padding: 40px 80px;
`;
