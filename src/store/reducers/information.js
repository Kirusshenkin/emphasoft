import { FETCH_INFORMATION_REQUEST, FETCH_INFORMATION_SUCCESS, FETCH_INFORMATION_ERROR, FETCH_INFORMATION_SORT, FETCH_EDIT_DATA, FETCH_EDIT_FIELD } from '../actions/actionTypes'

const initialState = {
    data: [],
    isLoading: false,
    error: null,
    sort: 'asc',
    sortField: 'id',
}

export default function informationReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_INFORMATION_REQUEST:
            return {
                ...state, isLoading: true
            }
        case FETCH_INFORMATION_SUCCESS:
            return {
                ...state, isLoading: false, data: action.data
            }
        case FETCH_INFORMATION_ERROR:
            return {
                ...state, isLoading: false, data: action.error
            }
        case FETCH_INFORMATION_SORT:
            return {
                ...state, sort: action.sort, sortField: action.sortField
            }
        case FETCH_EDIT_DATA:
            return {
                ...state,
                data: state.data.map(user => user.id === action.id ?
                    { ...user, is_edit: !user.is_edit } : 
                    user
                ) 
            }
        case FETCH_EDIT_FIELD:
            return {
                ...state,
                data: state.data.map(user => user.id === action.id ?
                    { ...user, [action.field]: action.value } : 
                    user
                ) 
            };
        default:
            return state
    }
}