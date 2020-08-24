import {combineReducers} from 'redux'
import authReducer from './auth'
import informationReducer from './information'

export default combineReducers ({
    auth: authReducer,
    information: informationReducer
})