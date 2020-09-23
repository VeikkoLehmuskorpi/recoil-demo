export const fetchPost = async (postId, postListFilter = {}) => {
  try {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId ? postId + 1 : 1}${
        postListFilter.userId ? `?userId=${postListFilter.userId}` : `?`
      }`,
    );
    const postList = await resp.json();

    return postList;
  } catch (err) {
    throw new Error('Failed to fetch post list');
  }
};
