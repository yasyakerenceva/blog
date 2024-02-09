import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { ROLE } from "../../constants";
import { setUser } from "../../store/actions";
import { selectUserRole } from "../../store/selectors";
import { Button, ErrorForm, Input, Title } from "../../components";
import { useResetForm } from "../../hooks/use-reset-form";
import styled from "styled-components";

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 260px;
	margin-top: 32px;
`;

const StyledLink = styled(Link)`
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const authFormScheme = yup.object().shape({
	login: yup
		.string()
		.required("Заполните логин")
		.matches(/^\w+$/, "Неверный логин. Допускаются только буквы и цифры")
		.min(3, "Неверный логин. Минимум 3 символа")
		.max(15, "Неверный логин. Максимум 15 символов"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/^[\w#%]+$/,
			"Неверный пароль. Допускаютя буквы, цифры, и знаки # %",
		)
		.min(6, "Неверный пароль. Минимум 6 символов")
		.max(30, "Неверный пароль. Максимум 30 символов"),
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: yupResolver(authFormScheme),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
			} else {
				dispatch(setUser(res));
				sessionStorage.setItem("userData", JSON.stringify(res));
			}
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<Title mt="60px">Авторизация</Title>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register("login", {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register("password", {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError} height="56px">
					Авторизоваться
				</Button>
				{errorMessage && <ErrorForm>{errorMessage}</ErrorForm>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</StyledForm>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
