import PropTypes from "prop-types";
import { Button } from "../../../../components";
import styled from "styled-components";

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</Button>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 0 35px;
	position: absolute;
	bottom: 160px;

	& button,
	& .current-page {
		margin: 0 5px;
	}

	& .current-page {
		width: 100%;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
		border: 1px solid #000;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
