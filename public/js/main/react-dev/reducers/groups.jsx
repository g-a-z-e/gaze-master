/**
 * @module GroupReducer
 * @author Rube
 * @date 15/10/25
 * @desc Group's detail deal process
 */

import {ADD_GROUP, DELETE_GROUP, UPDATE_GROUP, FIND_GROUP, FIND_ALL_GROUP} from '../constants/index';
import {Group} from '../constants/entity';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_GROUP:
            let group = new Group(action.groupName, action.groupType, action.groupKey, action.groupServerAddress);
            return [group, ...state];
            break;
        case DELETE_GROUP:
            return state;
            break;
        case UPDATE_GROUP:
            return state;
            break;
        case FIND_GROUP:
            return state;
            break;
        case FIND_ALL_GROUP:
            let groups = action.groups.map(group=> {
                return new Group(group.groupName, group.groupType, group.groupKey, group.groupServerAddress);
            });
            return groups;
            break;
        default:
            return state;
    }
}