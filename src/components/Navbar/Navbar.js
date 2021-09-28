import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import classes from './Navbar.module.css';

export const Navbar = (props) => {
  console.log('props inside navbar', props);
  return   (
    <nav className={classes.Navbar}>
      <div className={classes.NavbarBrand}>
        New Netflix
      </div>
      <ul className={classes.NavbarLinks}>
        <li className={classes.NavbarLink}>
          <NavLink to='/shows' exact activeClassName={classes.active}>Shows</NavLink>
        </li>
        <li className={classes.NavbarLink}>
          <NavLink to={`/user/${props.user.userId}`} exact activeClassName={classes.active}>Profile</NavLink>
        </li>
        <li className={classes.NavbarLink}>
          <NavLink to='/logout' exact activeClassName={classes.active}>Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}


// const mapStateToProps = state => {
//   console.log('state in navbar', state);
//   return {
//     user: state.user.user,
//     isAuthenticated: state.auth.token !== null,
//   };
// };

export default Navbar;

// export default connect(mapStateToProps)(Navbar);