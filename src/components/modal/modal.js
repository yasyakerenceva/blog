import styled from "styled-components";
import { Button } from "../button/button";
import { useSelector } from "react-redux";
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalTitle,
} from "../../store/selectors";

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const title = useSelector(selectModalTitle);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{title}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}

	& .box {
		position: relative;
		width: 400px;
		margin: auto;
		padding: 20px;
		text-align: center;
		top: 50%;
		transform: translate(0, -50%);
		background-color: #fff;
		border: 3px solid #000;
	}

	& .buttons {
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		& button {
			margin: 0 5px;
		}
	}
`;
