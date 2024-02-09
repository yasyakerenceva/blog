import PropTypes from "prop-types";
import styled from "styled-components";

const TitleContainer = ({ children, className, ...props }) => {
	return (
		<h2 className={className} {...props}>
			{children}
		</h2>
	);
};

export const Title = styled(TitleContainer)`
	margin-top: ${({ mt = "0" }) => mt};
	font-size: 32px;
	font-weight: 600;
`;

Title.propTypes = {
	children: PropTypes.node.isRequired,
};
