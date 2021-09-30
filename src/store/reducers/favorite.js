import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    favorite: [],
    loading: false,
    error: false
};

const addToFavorite = (state, action) => { //check whats in state, maybe state.user.fav
    console.log('IN add to fav reducer');
    const newFavoriteList = state.favorite?.length ? [...state.favorite, action.show] : [action.show];
    console.log('INPUT', state, action);
    console.log('NEW arr', newFavoriteList);
    return updateObject(state, {
      loading: false,
      favorite: newFavoriteList
  } );
};

const removeFromFavorite = (state, action) => {
    const newFavoriteList = state.favorite.filter(elem => elem.id !== action.show.id);
    console.log('WHAT UPDATE IN REDUCER', newFavoriteList)
    return updateObject(state, {
        loading: false,
        favorite: newFavoriteList
    } );
};

const updateFavoriteFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true
    });
};

const updateFavoriteStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const updateFavoriteSuccess = (state, action) => {
    return updateObject(state, {
        favorite: action.favorite,
        loading: false
    } );
};

const getFavoriteFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true
    });
};

const getFavoriteStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const getFavoriteSuccess = (state, action) => {
    return updateObject(state, {
        favorite: action.favorite,
        loading: false
    } );
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_FAVORITE: return addToFavorite(state, action);
        case actionTypes.REMOVE_FROM_FAVORITE: return removeFromFavorite(state, action);
        case actionTypes.UPDATE_FAVORITE_START: return updateFavoriteStart(state, action);
        case actionTypes.UPDATE_FAVORITE_SUCCESS: return updateFavoriteSuccess(state, action)
        case actionTypes.UPDATE_FAVORITE_FAIL: return updateFavoriteFail(state, action);
        case actionTypes.GET_FAVORITE_START: return getFavoriteStart(state, action);
        case actionTypes.GET_FAVORITE_SUCCESS: return getFavoriteSuccess(state, action);
        case actionTypes.GET_FAVORITE_FAIL: return getFavoriteFail(state, action);
        default: return state;
    }
};

export default reducer;