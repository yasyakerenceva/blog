import { Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { Authorization, Registration, Users } from "./pages";
import styled from "styled-components";

const AppColumn = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Main = styled.div`
	padding: 120px 0;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Main>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post/:postId" element={<div>Статья</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Main>
			<Footer />
		</AppColumn>
	);
};
