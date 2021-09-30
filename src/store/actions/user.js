import * as actionTypes from './actionTypes';
import axios from '../../axios-db';

export const saveUserSuccess = (userData, userTableId) => {
  return {
      type: actionTypes.SAVE_USER_SUCCESS,
      userData: userData,
      userTableId: userTableId
  };
};

export const saveUserFail = (error) => {
  return {
      type: actionTypes.SAVE_USER_FAIL,
      error: error
  };
}

export const saveUserStart = () => {
  return {
      type: actionTypes.SAVE_USER_START
  };
};

export const saveUser = (userData, token) => {
  console.log('In save user action', userData, token);
  return dispatch => {
    dispatch( saveUserStart() );
    axios.post( '/users.json?auth=' + token, userData )
        .then( response => {
          console.log('RESPONSE', response);
            dispatch( saveUserSuccess( userData, response.data.name ) );
        } )
        .catch( error => {
            dispatch( saveUserFail( error ) );
        } );
  };
};

export const fetchUserSuccess = (user, userTableId) => {
  console.log('FETCH user suxess', user )
  return {
      type: actionTypes.FETCH_USER_SUCCESS,
      user: user,
      userTableId: userTableId
  };
};

export const fetchUserFail = ( error ) => {
  return {
      type: actionTypes.FETCH_USER_FAIL,
      error: error
  };
};

export const fetchUserStart = () => {
  return {
      type: actionTypes.FETCH_USER_START
  };
};

export const fetchUser = (userId) => {
  return dispatch => {
      dispatch(fetchUserStart());
      const queryParams = '?orderBy="userId"&equalTo="' + userId + '"';
      axios.get( '/users.json' + queryParams)
        .then( res => {
            let fetchedUser, userTableId;
            for ( let key in res.data ) {
                  fetchedUser = {
                    ...res.data[key]
                  }
                  userTableId = key;
            }
            dispatch(fetchUserSuccess(fetchedUser, userTableId));
        } )
        .catch( err => {
            dispatch(fetchUserFail(err));
        } );
  };
};
