import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  postListState,
  lastPostIdState,
  postListFilterState,
  filteredPostListState,
} from '../api/state';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPost } from '../api/actions';

const PostList = () => {
  const [postListFilter, setPostListFilter] = useRecoilState(
    postListFilterState,
  );
  const [postList, setPostList] = useRecoilState(postListState);
  const filteredPostList = useRecoilValue(filteredPostListState);
  const lastPostId = useRecoilValue(lastPostIdState);

  // Load the initial post
  useEffect(() => {
    if (!lastPostId) {
      (async () => {
        const post = await fetchPost();
        setPostList([...postList, post]);
      })();
    }
  }, [lastPostId, postList, setPostList]);

  const loadNextPost = async () => {
    const post = await fetchPost(lastPostId, postListFilter);
    setPostList([...postList, post]);
  };

  const handleUserIdInputChange = ({ target: { value } }) => {
    setPostListFilter({ ...postListFilter, userId: value });
  };

  return (
    <React.Fragment>
      <h1>Post List</h1>
      <label htmlFor="userId">
        User ID <input name="userId" onChange={handleUserIdInputChange}></input>
      </label>
      <InfiniteScroll
        dataLength={postList.length}
        next={loadNextPost}
        hasMore={true}>
        {
          <ul>
            {filteredPostList.map((post) => (
              <li key={post.id}>
                (User ID: {post.userId}) {post.title}
              </li>
            ))}
          </ul>
        }
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default PostList;
