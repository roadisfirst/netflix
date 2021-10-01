import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Users.module.css';
import * as actions from '../../store/actions/index';
import { NavLink } from 'react-router-dom';

const Users = ({dispatch, loading, users, hasErrors}) => {
  useEffect(() => {
    dispatch(actions.fetchUsers())
  }, [dispatch]);

  const renderUsers = () => {
    if (loading) return <Spinner />
    if (hasErrors) return <p>Unable to display Users.</p>

    return (
      users.map((person) =>
        <ul className={classes.Users}>
          <li key={person.id} className={classes.User}>
            <NavLink className={classes.UserLink} to={`/user/${person.userId}`}>{person.email}</NavLink>
          </li>
        </ul>
      ))
  };

  return (
    <section>
      <h2 className={classes.UsersHeader}>All Users</h2>
      {renderUsers()}
    </section>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loading: state.users.loading,
    hasErrors: state.users.error
  };
};

export default connect(
  mapStateToProps
)(Users);