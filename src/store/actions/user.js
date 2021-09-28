import * as actionTypes from './actionTypes';
import axios from '../../axios-user';

export const saveUserSuccess = ( id, userData ) => {
  return {
      type: actionTypes.SAVE_USER_SUCCESS,
      userId: id,
      userData: userData
  };
};

export const saveUserFail = ( error ) => {
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

export const saveUser = ( userData, token) => {
  console.log('In save user action', userData, token);
  return dispatch => {
    dispatch( saveUserStart() );
    axios.post( '/users.json?auth=' + token, userData )
        .then( response => {
            dispatch( saveUserSuccess( response.data.name, userData ) );
        } )
        .catch( error => {
            dispatch( saveUserFail( error ) );
        } );
  };
};

export const getFavourite = () => ({
  type: actionTypes.GET_FAVOURITE
})

export const getFavouriteSuccess = (Favourite) => ({
  type: actionTypes.GET_FAVOURITE_SUCCESS,
  payload: Favourite,
})

export const getFavouriteFail = () => ({
  type: actionTypes.GET_FAVOURITE_FAIL
})

export function fetchFavourite(token, userId) {
  return async (dispatch) => {
    dispatch(getFavourite())
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get( '/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(getFavouriteSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(getFavouriteFail(err));
            } );
  }
}

export const fetchUserSuccess = ( user ) => {
  return {
      type: actionTypes.FETCH_USER_SUCCESS,
      user: user
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
  console.log('IN USER ACTIONS', userId);
  return dispatch => {
      dispatch(fetchUserStart());
      // const queryParams = '?orderBy="userId"&equalTo="' + userId + '"';
      // axios.get( '/users.json' + queryParams)
      axios.get( '/users.json')
          .then( res => {
              console.log('RESP', res.data)
              let fetchedUser;
              for ( let key in res.data ) {
                  if (key === userId) {
                    fetchedUser = {
                      ...res.data[key],
                      id: key
                    };
                  }
              }
              dispatch(fetchUserSuccess(fetchedUser));
          } )
          .catch( err => {
              dispatch(fetchUserFail(err));
          } );
  };
};