import PropTypes from "prop-types";
import styled from "styled-components";

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 10px;
	border: ${({ border }) => (border ? "1px solid #000;" : "none;")};

	& > div {
		display: flex;
		justify-content: space-between;
	}

	& .login-col,
	& .registered-at-col,
	& .role-col {
		width: calc(100% / 3);
	}
`;

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
};
