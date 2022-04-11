import { LinearProgress } from '@mui/material';
import React, { lazy, Suspense, ReactNode, FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Homepage from './pages/home/Homepage';
import Notfoundpage from './pages/Notfoundpage';
import Photospage from './pages/Photospage';
import Postspage from './pages/Postspage';

// Ленивая подгрузка компонента. Подгрузится только, когда перейдешь на ссылку
const UsersPage = lazy(() => import('./pages/users/Userspage'));
const TodosPage = lazy(() => import('./pages/todo/Todospage'));

const CustomSuspense: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return <Suspense fallback={<LinearProgress />}>{children}</Suspense>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route
            path='users'
            element={
              // fallback - loader (react- component).
              <CustomSuspense>
                <UsersPage />
              </CustomSuspense>
            }
          />
          <Route
            path='todos'
            element={
              <CustomSuspense>
                <TodosPage />
              </CustomSuspense>
            }
          />
          <Route
            path='todos/:page'
            element={
              <CustomSuspense>
                <TodosPage />
              </CustomSuspense>
            }
          />
          <Route path='photos' element={<Photospage />} />
          <Route path='posts' element={<Postspage />} />
          <Route path='*' element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
