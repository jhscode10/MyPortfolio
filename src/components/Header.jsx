import '../assets/styles/components/Header.scss';
import '../assets/styles/components/Menu.scss';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import navRoutes from './RoutesNav';
import { Icon, InlineIcon } from '@iconify/react';

const Header = () => {
  const [theme, setTheme] = useState('light');
  const [menu, setMenu] = useState('');

  useEffect(() => {
    // console.count('Header');
    const currentTheme = localStorage.getItem('Theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Theme', theme);
    document.body.className = theme;
  }, [theme]);

  const handleClick = async () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    localStorage.setItem('Theme', theme);
    document.body.className = await theme;
  };

  const handleMenu = () => {
    if (menu === '') {
      setMenu('active');
    } else {
      setMenu('');
    }
  };

  let navigationList = navRoutes.map(({ path, name, key, icon }) => (
    <NavLink
      className={(navData) => (navData.isActive ? 'active' : '')}
      exact="true"
      key={key}
      to={path}
    >
      <li>
        <Icon icon={icon} />
        <span> {name} </span>
      </li>
    </NavLink>
  ));

  return (
    <>
      <header className={`header ${menu}`}>
        <section className="header--container">
          <div className="logo">
            <Icon icon="noto:avocado" />
            <span>Awakate.dev</span>
          </div>
          <nav className="header--navBar">
            <ul>{navigationList}</ul>

            <button>
              <Icon icon="mdi-light:book-multiple" /> Blog{' '}
              <Icon icon="mdi-light:chevron-down" />
            </button>
          </nav>
          <div className="header--themeSwitch">
            <button
              onClick={() => {
                handleClick();
              }}
            >
              <Icon icon="mdi-light:lightbulb" /> theme
            </button>
          </div>
        </section>
      </header>
      <button
        className={`menu ${menu}`}
        onClick={() => {
          handleMenu();
        }}
      >
        <Icon icon="mdi-light:chevron-right" />
      </button>
    </>
  );
};
export default Header;
