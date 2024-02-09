import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = ({ children, className, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	align-items: center;
	width: ${({ width = "100%" }) => width};
	justify-content: center;
	font-size: 18px;
	height: ${({ height = "32px" }) => height};
	border: 1px solid #000;
	background-color: #eee;
	cursor: pointer;

	&:disabled {
		cursor: default;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
};
