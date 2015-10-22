/**
 * @module
 * @author Rube
 * @date 15/10/26
 * @desc
 */
import {SELECT_GROUP} from '../constants/index'

export default (state = {}, action) => {
    switch (action.type) {
        case SELECT_GROUP:
            return Object.assign({}, state, {groupSelected: action.groupKey});
            break;
        default :
            return state;
    }
}