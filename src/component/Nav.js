import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

import MyContext from '../contextAPI/context';

function Nav(props) {
  const contextInfo = useContext(MyContext);
  console.log(contextInfo, 'NAV');
  return (
    <div className='nav flex space-btw width-90'>
      <ul className='flex'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <li className='popular'>Popular</li>
        </NavLink>
        <NavLink
          to='/battle'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <li className='popular'>Battle</li>
        </NavLink>
      </ul>
      <div onClick={() => props.setDarkMode(!props.isDarkMode)}>
        {props.isDarkMode ? (
          <FaSun
            className={props.isDarkMode ? 'moon moon-dark-mode' : 'moon'}
          />
        ) : (
          <FaMoon className='moon' />
        )}
      </div>
    </div>
  );
}

export default Nav;
