import styled from "styled-components";

const IconContainer = ({ className, classIcon }) => (
	<div className={className}>
		<i className={`fa ${classIcon}`} aria-hidden></i>
	</div>
);

export const Icon = styled(IconContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${({ size = "24px" }) => size};
	margin: ${({ margin = "0" }) => margin};
`;
