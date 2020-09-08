import axios from '../../axios/http-axios'
import { FETCH_INFORMATION_REQUEST, FETCH_INFORMATION_SUCCESS, FETCH_INFORMATION_ERROR, FETCH_INFORMATION_SORT, FETCH_EDIT_DATA, FETCH_EDIT_FIELD } from './actionTypes'

export function fetchInformation() {
    return async dispatch => {
        dispatch(fetchInformationStart())
        await axios.get('/api/v1/users/')
        .then((response) => {
            dispatch(fetchInformationSuccess(response.data))
        }).catch((error) => {
            dispatch(fetchInformationError(error))
        })
    }
}

export function fetchInformationStart() {
    return {
        type: FETCH_INFORMATION_REQUEST
    }
}

export function fetchInformationSuccess(data) {
    return {
        type: FETCH_INFORMATION_SUCCESS,
        data
    }
}

export function fetchInformationError(error) {
    return {
        type: FETCH_INFORMATION_ERROR,
        error: error
    }
}

export function fetchSort(sort, sortField) {
    return dispatch => {
        dispatch({
            type: FETCH_INFORMATION_SORT,
            sort: sort,
            sortField: sortField
        })
    }
}

export function fetchEdit(id) {
    return {
        type: FETCH_EDIT_DATA,
        id: id
    }
}

export function fetchEditField(id, field, value) {
    return {
        type: FETCH_EDIT_FIELD,
        id: id,
        field: field,
        value: value
    }
}

export function fetchEditSave(item, cb) {
    return async dispatch => {
        axios.put(`/api/v1/users/${item.id}/`, item)
        .then((res) => {
            cb(true, res.data)
        }).catch((error) => {
            cb(false, error.response)
        })
    }
}