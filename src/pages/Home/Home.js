import React, {Fragment} from "react";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <Fragment>
      <h1>Home page</h1>
      <div>Wellcome to our new application that changes reality</div>
      <NavLink to="/auth">Please login</NavLink>
    </Fragment>
  )
}