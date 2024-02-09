import { PROP_TYPE } from "../../constants";
import { Title } from "../title/title";
import styled from "styled-components";

const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const Error = ({ error }) =>
	error && (
		<Div>
			<Title mt="60px">Ошибка</Title>
			<div>{error}</div>
		</Div>
	);

Error.propTypes = {
	error: PROP_TYPE.ERROR,
};
