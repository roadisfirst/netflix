import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup, data) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyCGHvEAfO6qqmEnmuqjP92KX_PmWvaM094';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyCGHvEAfO6qqmEnmuqjP92KX_PmWvaM094';
        }
        axios.post( url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                if (isSignup) {
                    console.log('on new user')
                    const dataWithId = {...data, userId: response.data.localId}
                    console.log('SAVING block', dataWithId)
                    dispatch(saveUser(dataWithId, response.data.idToken));
                } else {
                    dispatch(fetchUser(response.data.localId))
                }
                
            })
            .catch(err => {
                console.log(err.response);
                dispatch(authFail(err.response?.data?.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token =localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export const saveUserSuccess = ( userData ) => {
    return {
        type: actionTypes.SAVE_USER_SUCCESS,
        // userId: id,
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
      let url = 'https://react-netflix-de0a4-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=';
      axios.post( url + token, userData )
          .then( response => {
              dispatch( saveUserSuccess( userData ) );
          } )
          .catch( error => {
              dispatch( saveUserFail( error ) );
          } );
    };
  };

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
        let url = 'https://react-netflix-de0a4-default-rtdb.europe-west1.firebasedatabase.app/users.json';
        const queryParams = '?orderBy="userId"&equalTo="' + userId + '"';
        // axios.get( '/users.json' + queryParams)
        axios.get( url + queryParams)
            .then( res => {
                console.log('RESP', res.data)
                let fetchedUser;
                for ( let key in res.data ) {
                      fetchedUser = {
                        ...res.data[key],
                        // id: key
                    }
                }
                dispatch(fetchUserSuccess(fetchedUser));
            } )
            .catch( err => {
                dispatch(fetchUserFail(err));
            } );
    };
  };