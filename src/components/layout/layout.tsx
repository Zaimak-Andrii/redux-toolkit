import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import './style.scss';

type Props = {};

const Layout = ({}: Props) => {
  return (
    <div className='container'>
      <Header />

      <main className='main'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
