import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './Profile.module.css';
import * as actions from '../../store/actions/index';

const Profile = ({
  match,
  dispatch,
  token,
  loading,
  user
}) => {

  useEffect(() => {
    const { id } = match.params
    console.log('Check', id, user);

    dispatch(actions.fetchUser(id))
  }, []);

  return (
    <div className={classes.Profile}>
      <h2>{user.email} profile</h2>
      {/* {!loading&&user.email} */}
      <h2>Favourite shows</h2>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

export default connect(
  mapStateToProps
)(Profile);