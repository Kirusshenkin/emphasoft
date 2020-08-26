import { FETCH_SEARCH_SUCCESS, FECTH_SEARCH_ERROR } from '../actions/actionTypes'

const initialState = {
    payload: '',
    error: null
}

export default function searchReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEARCH_SUCCESS:
            return {
                ...state, payload: action.search
            }
        case FECTH_SEARCH_ERROR:
            return {
                ...state, payload: action.error
            }
        default:
            return state
    }

}