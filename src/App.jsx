import React from 'react';
import { RecoilRoot } from 'recoil';
import PostList from './Post/List';

const App = () => {
  return (
    <RecoilRoot>
      <main
        style={{
          height: '100vh',
        }}>
        <PostList />
      </main>
    </RecoilRoot>
  );
};

export default App;
