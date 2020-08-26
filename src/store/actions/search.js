import { FETCH_SEARCH_SUCCESS, FECTH_SEARCH_ERROR } from './actionTypes'

export function fetchSearch(search) {
    return dispatch => {
        dispatch(fetchSearchSuccess(search))
    }
}

export function fetchSearchSuccess(search) {
    return {
        type: FETCH_SEARCH_SUCCESS,
        search: search
    }
}

export function fetchSearchError(error) {
    return {
        type: FECTH_SEARCH_ERROR,
        error: error
    }
}