import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../../hooks";
import { savePostAsync } from "../../../../store/actions";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { sanitizeContent } from "./utils/sanitize-content";
import styled from "styled-components";

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const requestServer = useServerRequest();

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input
				ref={imageRef}
				defaultValue={imageUrl}
				placeholder="Изображение"
			/>
			<Input
				ref={titleRef}
				defaultValue={title}
				placeholder="Заголовок"
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButton={
					<Icon
						classIcon="fa-floppy-o"
						margin="0 15px 0 0"
						onClick={onSave}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable
				suppressContentEditableWarning
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 40px 20px 0;
	}

	& h2 {
		font-size: 25px;
	}

	& .post-text {
		margin-top: 14px;
		font-size: 18px;
		white-space: pre-line;
	}
`;
