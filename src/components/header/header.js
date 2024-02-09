import { ControlPanel, Logo } from "./components";
import styled from "styled-components";

const Discription = styled.div`
	display: flex;
	align-items: center;
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			Веб-технологии <br /> Написание кода <br /> Разбор ошибок
		</Discription>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: inherit;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px -7px 35px 9px #616161;
	background-color: #fff;
	z-index: 10;
`;
