import { Title } from "../title/title";
import styled from "styled-components";

const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const Content = ({ children, error }) =>
	error ? (
		<Div>
			<Title mt="60px">Ошибка</Title>
			<div>{error}</div>
		</Div>
	) : (
		children
	);
