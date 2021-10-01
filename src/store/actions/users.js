import * as actionTypes from './actionTypes';
import axios from '../../axios-db';

export const fetchUsersSuccess = (users) => {
  return {
      type: actionTypes.FETCH_USERS_SUCCESS,
      users: users
  };
};

export const fetchUsersFail = (error) => {
  return {
      type: actionTypes.FETCH_USERS_FAIL,
      error: error
  };
};

export const fetchUsersStart = () => {
  return {
      type: actionTypes.FETCH_USERS_START
  };
};

export const fetchUsers = () => {
  return dispatch => {
      dispatch(fetchUsersStart());
      axios.get( '/users.json')
        .then( res => {
            let fetchedUsers = [];
            for (let key in res.data) {
                  fetchedUsers.push({
                    ...res.data[key]
                  });
            }
            dispatch(fetchUsersSuccess(fetchedUsers));
        } )
        .catch( err => {
            dispatch(fetchUsersFail(err));
        } );
  };
};
