import { useNavigate } from "react-router-dom";
import { Icon, Title } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import styled from "styled-components";

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<Title>{title}</Title>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButton={
					<Icon
						classIcon="fa-pencil-square-o"
						margin="0 0 0 0"
						size="18px"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
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
