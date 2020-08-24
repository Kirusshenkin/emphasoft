import { FETCH_INFORMATION_REQUEST, FETCH_INFORMATION_SUCCESS, FETCH_INFORMATION_ERROR } from '../actions/actionTypes'

const initialState = {
    information: [],
    isLoading: false,
    error: null,
    search: '',
    sort: 'asc',
    sortField: 'id',
    row: null,
    currentPage: 0
}

export default function informationReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_INFORMATION_REQUEST:
            return {
                ...state, loading: true
            }
        case FETCH_INFORMATION_SUCCESS:
            return {
                ...state, loading: false, information: action.information
            }
        case FETCH_INFORMATION_ERROR:
            return {
                ...state, loading: false, information: action.error
            }
        default:
            return state
    }
}