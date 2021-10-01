import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shows: [],
    loading: false,
    hasErrors: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_SHOWS:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_SHOWS_SUCCESS:
            return {
                shows: action.payload,
                loading: false,
                hasErrors: false
            };
        case actionTypes.GET_SHOWS_FAIL:
            return {
                ...state,
                loading: false,
                hasErrors: true
            };
        default:
            return state;
    }
};

export default reducer;