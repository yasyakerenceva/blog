import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState("");
	const [temperature, setTemperature] = useState("");
	const [weather, setWeather] = useState("");

	useEffect(() => {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=Tomsk&units=metric&lang=ru&appid=a7af2fb1fc240d20e4327bf468dbcc33",
		)
			.then((response) => response.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);

	return (
		<footer className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city},{" "}
					{new Date().toLocaleString("ru", {
						day: "numeric",
						month: "long",
					})}
				</div>
				<div>
					{temperature} градусов, {weather}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: inherit;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	box-shadow: 0px 9px 35px 9px #616161;
	background-color: #fff;
`;
