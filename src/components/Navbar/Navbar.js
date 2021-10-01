import React from "react";
import { NavLink } from "react-router-dom";

import classes from './Navbar.module.css';

export const Navbar = (props) => {
  return (
    <nav className={classes.Navbar}>
      <div className={classes.NavbarBrandLink}>
        <NavLink to='/'>New Netflix</NavLink>
      </div>
      <ul className={classes.NavbarLinks}>
        <li className={classes.NavbarLink}>
          <NavLink to='/shows' exact activeClassName={classes.active}>Shows</NavLink>
        </li>
        <li className={classes.NavbarLink}>
          <NavLink to='/users' exact activeClassName={classes.active}>Users</NavLink>
        </li>
        <li className={classes.NavbarLink}>
          <NavLink to={`/user/${props.userId}`} exact activeClassName={classes.active}>Profile</NavLink>
        </li>
        <li className={classes.NavbarLink}>
          <NavLink to='/logout' exact activeClassName={classes.active}>Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
