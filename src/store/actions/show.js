import * as actionTypes from './actionTypes';
import axios from '../../axios-shows';

export const getShow = () => ({
    type: actionTypes.GET_SHOW
})

export const getShowSuccess = (Show) => ({
    type: actionTypes.GET_SHOW_SUCCESS,
    payload: Show,
})

export const getShowFail = () => ({
    type: actionTypes.GET_SHOW_FAIL
})

export function fetchShow(id) {
    return async (dispatch) => {
        dispatch(getShow());
        try {
            const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
            dispatch(getShowSuccess(response.data));
        } catch (error) {
            dispatch(getShowFail());
        }
    }
}