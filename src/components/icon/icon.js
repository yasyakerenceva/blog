import PropTypes from "prop-types";
import styled from "styled-components";

const IconContainer = ({ className, classIcon, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${classIcon}`} aria-hidden></i>
	</div>
);

export const Icon = styled(IconContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${({ size = "24px" }) => size};
	margin: ${({ margin = "0" }) => margin};
	color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};

	&:hover {
		cursor: ${({ inactive }) => (inactive ? "default" : "pointer")};
	}
`;

Icon.propTypes = {
	classIcon: PropTypes.string.isRequired,
	inactive: PropTypes.bool,
};
