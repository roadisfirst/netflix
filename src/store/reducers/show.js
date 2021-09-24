import * as actionTypes from '../actions/actionTypes';

const initialState = {
    show: {},
    loading: false,
    hasErrors: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_SHOW:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_SHOW_SUCCESS:
            return {
                show: action.payload,
                loading: false,
                hasErrors: false
            };
        case actionTypes.GET_SHOW_FAIL:
            return {
                ...state,
                loading: false,
                hasErrors: true
            };
        default: return state;
    }
};

export default reducer;