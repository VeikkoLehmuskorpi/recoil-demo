import { atom, selector } from 'recoil';

export const postListState = atom({
  key: 'PostList',
  default: [],
});

export const postListFilterState = atom({
  key: 'PostListFilter',
  default: {
    userId: null,
  },
});

export const filteredPostListState = selector({
  key: 'filteredPostListState',
  get: ({ get }) => {
    const filter = get(postListFilterState);
    const postList = get(postListState);

    switch (Boolean(filter.userId)) {
      case true:
        const filteredList = postList.filter(
          (post) => Number(post.userId) === Number(filter.userId),
        );
        return filteredList;
      case false:
        return postList;
    }
  },
});

export const lastPostIdState = selector({
  key: 'LastPostId',
  get: ({ get }) => {
    const postList = get(postListState);

    if (postList.length) {
      return Number(postList[postList.length - 1].id);
    }

    return null;
  },
});
