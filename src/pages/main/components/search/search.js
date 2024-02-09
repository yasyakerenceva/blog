import PropTypes from "prop-types";
import { Icon, Input } from "../../../../components";
import styled from "styled-components";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				onChange={onChange}
				placeholder="Поиск по заголовкам..."
			/>
			<Icon
				classIcon="fa-search"
				size="20px"
				margin="0 0 0 0"
				inactive={true}
			/>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 0 auto;

	& input {
		height: 100%;
		margin: 0;
		padding-right: 30px;
	}

	& > div {
		position: absolute;
		right: 7px;
		top: 50%;
		transform: translateY(-50%);
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
