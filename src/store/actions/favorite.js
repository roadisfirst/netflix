import * as actionTypes from './actionTypes';
import axios from '../../axios-db';

export const addToFavorite = (show) => {
  return {
    type: actionTypes.ADD_TO_FAVORITE,
    show: show
  }
};

export const removeFromFavorite = (show) => {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITE,
    show: show
  }
};

export const getFavoriteStart = () => {
  return {
    type: actionTypes.GET_FAVORITE_START
  }
};

export const getFavoriteSuccess = (favoriteList) => {
  return {
    type: actionTypes.GET_FAVORITE_SUCCESS,
    favorite: favoriteList,
  }
};

export const getFavoriteFail = (error) => {
  return {
    type: actionTypes.GET_FAVORITE_FAIL,
    error: error
  }
};

export function fetchFavorite(userTableId) {
  return async (dispatch) => {
    dispatch(getFavoriteStart())
    axios.get( `/users/${userTableId}/favoriteList.json`)
      .then( res => {
        console.log('check res', res.data);
          const favoriteList = res.data ? res.data : [];
          dispatch(getFavoriteSuccess(favoriteList));
      } )
      .catch( err => {
          dispatch(getFavoriteFail(err));
      } );
  }
};

export const updateFavorite = (newFavoriteList, userTableId, token) => {
  console.log('WHAT TO UPDATE', newFavoriteList);
  return dispatch => {
      dispatch(updateFavoriteStart());
      axios.put( `/users/${userTableId}/favoriteList.json?auth=${token}`, newFavoriteList)
        .then(response => {
          console.log(response);
          dispatch( updateFavoriteSuccess(response.data));
        })
        .catch(error => {
            dispatch(updateFavoriteFail(error));
        });
  };
};

export const updateFavoriteStart = () => {
  return {
    type: actionTypes.UPDATE_FAVORITE_START
  }
};

export const updateFavoriteSuccess = (updatedFavoriteList) => {
  return {
    type: actionTypes.UPDATE_FAVORITE_SUCCESS,
    favorite: updatedFavoriteList
  }
};

export const updateFavoriteFail = (error) => {
  return {
    type: actionTypes.UPDATE_FAVORITE_FAIL,
    error: error
  }
};