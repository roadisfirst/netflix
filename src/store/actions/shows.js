import * as actionTypes from './actionTypes';
import axios from '../../axios-shows';

export const getShows = () => ({
  type: actionTypes.GET_SHOWS
})

export const getShowsSuccess = (shows) => ({
  type: actionTypes.GET_SHOWS_SUCCESS,
  payload: shows,
})

export const getShowsFail = () => ({
  type: actionTypes.GET_SHOWS_FAIL
})

export function fetchShows() {
  return async (dispatch) => {
    dispatch(getShows())
    try {
      const response = await axios.get('https://api.tvmaze.com/shows')
      console.log(response);

      dispatch(getShowsSuccess(response.data));
    } catch (error) {
      dispatch(getShowsFail());
    }
  }
}