export const transformComment = (dbComment) => ({
	id: dbComment.id,
	authorId: dbComment.author_id,
	content: dbComment.content,
	postId: dbComment.post_id,
	publishedAt: dbComment.published_at,
});
