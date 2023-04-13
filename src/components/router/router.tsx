import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from 'src/components/auth/auth_guard';
import FollowersPage from 'src/pages/follow_page/followers_page';
import FollowingPage from 'src/pages/follow_page/following_page';
import HomePage from 'src/pages/home_page/home_page';
import MessagesPage from 'src/pages/messages_page/messages_page';
import PostsPage from 'src/pages/posts_page/posts.page';
import UsersPage from 'src/pages/user_page/user_page';

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/followers" element={<FollowersPage />} />
        <Route path="/following" element={<FollowingPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
