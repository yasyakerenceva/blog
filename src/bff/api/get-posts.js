import { transformPost } from "../transformers";

export const getPosts = (page, limit) =>
	fetch(`http://localhost:3005/posts?_page=${page}&_per_page=${limit}`)
		.then((loadedPosts) => loadedPosts.json())
		.then(({ data: loadedPosts, last }) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			last,
		}));
