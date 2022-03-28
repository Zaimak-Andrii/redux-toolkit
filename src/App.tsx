import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Homepage from './pages/Homepage';
import Notfoundpage from './pages/Notfoundpage';
import Photospage from './pages/Photospage';
import Postspage from './pages/Postspage';
import Todospage from './pages/todo/Todospage';
import Userspage from './pages/Userspage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='users' element={<Userspage />} />
          <Route path='todos' element={<Todospage />} />
          <Route path='photos' element={<Photospage />} />
          <Route path='posts' element={<Postspage />} />
          <Route path='*' element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
