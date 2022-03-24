import React, { FunctionComponent } from 'react';
import { Link, useMatch } from 'react-router-dom';

// Тип данных
type NavLinkType = {
  to: string;
  children?: React.ReactNode;
};

const HeaderNavLink: FunctionComponent<NavLinkType> = ({ children, to, ...props }) => {
  const isMatch = useMatch(to);

  return (
    <Link to={to} style={{ color: isMatch ? 'var(--color-link-active)' : 'var(--color-link)' }} {...props}>
      {children}
    </Link>
  );
};

export default HeaderNavLink;
