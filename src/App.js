// import logo from './logo.svg';
import './App.css';
// import { VechaiProvider, Button } from "@vechaiui/react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { Category } from './pages/Category';
import { Author } from './pages/Author';
import { Comment } from './pages/Comment';
import Post from './pages/Post';

import Layout from './components/Layout';
import {VechaiProvider} from "@vechaiui/react";

import axios from 'axios';

axios.defaults.baseURL = 'https://fswd-wp.devnss.com/wp-json/wp/v2';


function App() {
  return (
    <VechaiProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:postId" element={<Post />} />
            <Route path="category" element={<Category />} />
            <Route path="author" element={<Author />} />
            <Route path="comment" element={<Comment />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </VechaiProvider>
  );
}

export default App;
