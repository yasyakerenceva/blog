import { useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/actions";
import { Authorization, Post, Registration, Users, Main } from "./pages";
import { ERROR } from "./constants";
import { Error, Footer, Header, Modal } from "./components";
import styled from "styled-components";

const AppColumn = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const MainContainer = styled.div`
	padding: 120px 0 0;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				role_id: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<MainContainer>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route
						path="*"
						element={<Error error={ERROR.PAGE_NOT_EXIST} />}
					/>
				</Routes>
			</MainContainer>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
