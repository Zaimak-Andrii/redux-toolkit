import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

type Props = {};

const Header = ({}: Props) => {
  return (
    <header className='header'>
      <nav>
        <Link to='/users'>Users</Link>
        <Link to='/posts'>Posts</Link>
        <Link to='/photos'>Photos</Link>
        <Link to='/todos'>Todos</Link>
      </nav>
    </header>
  );
};

export default Header;
