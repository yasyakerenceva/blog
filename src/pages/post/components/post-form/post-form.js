import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../../hooks";
import { savePostAsync } from "../../../../store/actions";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { sanitizeContent } from "./utils/sanitize-content";
import styled from "styled-components";
import { PROP_TYPE } from "../../../../constants";

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение"
				onChange={onImageChange}
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок"
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButton={
					<Icon
						classIcon="fa-floppy-o"
						margin="0 0 0 0"
						size="18px"
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
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
