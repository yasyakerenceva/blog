import PropTypes from "prop-types";
import styled from "styled-components";

const ErrorFormContainer = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};

export const ErrorForm = styled(ErrorFormContainer)`
	width: 100%;
	font-size: 18px;
	background: #fcadad;
	padding: 10px;
	margin-top: 10px;
`;

ErrorForm.propTypes = {
	children: PropTypes.node.isRequired,
};
