import React from "react";
import { NavLink } from "react-router-dom";

import classes from './Home.module.css';

export const Home = () => {
  return (
    <div className={classes.Home}>
      <h1 className={classes.HomeHeader}>New Netflix</h1>
      <p>Wellcome to our new application that changes reality</p>
      <NavLink to="/auth">Please login</NavLink>
    </div>
  )
}