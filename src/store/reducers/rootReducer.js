import {combineReducers} from 'redux'
import authReducer from './auth'
import informationReducer from './information'
import searchReducer from './search'

export default combineReducers ({
    auth: authReducer,
    users: informationReducer,
    search: searchReducer
})