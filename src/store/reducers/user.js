import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    user: {},
    loading: false,
    userTableId: null,
    error: false,
};

const saveUserStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const saveUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        user: state.user,
        userTableId: action.userTableId
    });
};

const saveUserFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true,
    });
};

const fetchUserStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchUserSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        loading: false,
        userTableId: action.userTableId
    } );
};

const fetchUserFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true,
    });
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.SAVE_USER_START: return saveUserStart(state, action);
        case actionTypes.SAVE_USER_SUCCESS: return saveUserSuccess(state, action)
        case actionTypes.SAVE_USER_FAIL: return saveUserFail(state, action);
        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        default: return state;
    }
};

export default reducer;