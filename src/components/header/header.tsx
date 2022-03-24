import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderNavLink from '../links/HeaderNavLink';
import './style.scss';

// Установка кастомного класса для активной ссылки. Деструктуризация параметра isActive с типом boolean без использования интерфейса.
const setActiveLinkAsClass = ({ isActive }: { isActive: boolean }): string => (isActive ? 'active-link' : '');
//============================================================================================================================================

// Установка кастомного стиля для активной ссылки. Деструктуризация параметра isActive с типом boolean с использования интерфейса.
type ActiveLink = {
  isActive: boolean;
};
const setActiveLinkAsStyle = ({ isActive }: ActiveLink): React.CSSProperties => ({
  color: isActive ? 'var(--color-link-active)' : 'var(--color-link)',
});
//============================================================================================================================================

const Header = () => {
  return (
    <header className='header'>
      <nav>
        {/* Ссылка по умолчанию добавляет класс .active. */}
        <NavLink to='/users'>Users</NavLink>
        {/*Ccылка с кастомным классом. */}
        <NavLink to='/photos' className={setActiveLinkAsClass}>
          Photos
        </NavLink>
        {/*Ссылка с кастомным стилем. */}
        <NavLink to='/todos' style={setActiveLinkAsStyle}>
          Todos
        </NavLink>
        {/*Кастомная ссылка. */}
        <HeaderNavLink to='/posts'>Posts</HeaderNavLink>
      </nav>
    </header>
  );
};

export default Header;
