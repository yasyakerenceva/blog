import { useEffect, useMemo, useState } from "react";
import { useServerRequest } from "../../hooks";
import { PAGINATION_LIMIT } from "../../constants";
import { Pagination, PostCard, Search } from "./components";
import { debounce, getLastPageFromLinks } from "./utils";
import styled from "styled-components";

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPageFromLinks(links));
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 2000),
		[],
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(
							({
								id,
								title,
								imageUrl,
								publishedAt,
								commentsCount,
							}) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	margin-top: 40px;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		margin-bottom: 64px;
	}

	& .no-posts-found {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}
`;
