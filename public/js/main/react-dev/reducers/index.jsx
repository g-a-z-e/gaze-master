/**
 * @module
 * @author Rube
 * @date 15/10/25
 * @desc
 */
import { combineReducers } from 'redux'
import groupsReducer from './groups'
import chooseReducer from './choose'

export default combineReducers({
    groups: groupsReducer,
    choose: chooseReducer
});