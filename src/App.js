// import logo from './logo.svg';
import './App.css';
// import { VechaiProvider, Button } from "@vechaiui/react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { Author } from './pages/Author';
import Post from './pages/Post';
import AuthorId from './pages/AuthorId';
import Tag from './pages/Tag';
import Layout from './components/Layout';
import {VechaiProvider} from "@vechaiui/react";
import AboutMe from './pages/AboutMe';

import axios from 'axios';

axios.defaults.baseURL = 'https://fswd-wp.devnss.com/wp-json/wp/v2';
axios.defaults.headers['Authorization'] = `Basic ${process.env.REACT_APP_AUTH_KEY}`


function App() {
  return (
    <VechaiProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts/:postId" element={<Post />} />
            {/* <Route path="posts/:postId/:authorId" element={<Post />} /> */}
            <Route path="category/" element={<Category />} />
            <Route path="category/:categoryId" element={<Category />} />
            <Route path="author" element={<Author />} />
            <Route path="author/:authorId" element={<AuthorId />} />
            <Route path="tag/:tagSlug" element={<Tag />} />
            <Route path="aboutme/" element={<AboutMe />} />
            {/* <Route path="comment" element={<Comment />} /> */}
        </Route>
        </Routes>
      </BrowserRouter>
    </VechaiProvider>
  );
}

export default App;
