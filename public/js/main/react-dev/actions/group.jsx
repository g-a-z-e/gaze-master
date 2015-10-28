/**
 * @module groupAction
 * @author Rube
 * @date 15/10/24
 * @desc group's action
 */

import * as
constants
from
'../constants/index';

import {checkStatus, parseJSON} from '../common/fetch'

const GROUP_API_ADD = constants.GROUP_API_ADD;

/** server operate **/
export function addGroup(groupName, groupType, groupServerAddress, resolve, reject) {
    return dispatch => {
        fetch(GROUP_API_ADD(groupName, groupType, groupServerAddress), {
            method: 'post',
            credentials: constants.API_CREDENTIALS
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(
                data => {
                let groupKey = data.data.groupKey;
                dispatch({
                    type: constants.ADD_GROUP,
                    groupName,
                    groupType,
                    groupKey,
                    groupServerAddress
                });
                resolve && resolve();
            }
        ).catch(
                error => {
                console.log(error);
                reject && reject();
            }
        );

    }
};

export function deleteGroup(groupName, groupType) {
    return {
        type: constants.DELETE_GROUP,
        groupName,
        groupType
    }
};

export function updateGroup(groupName, groupType, info) {
    return {
        type: constants.UPDATE_GROUP,
        groupName,
        groupType,
        info
    }
};

export function findGroup(groupName, groupType) {
    return {
        type: constants.FIND_GROUP,
        groupName,
        groupType
    }
};

export function findAllGroup(groupType, resolve, reject) {
    return dispatch => {
        fetch(constants.GROUP_API_FINDALL(groupType),
            {
                method: 'get',
                credentials: constants.API_CREDENTIALS
            }
        )
            .then(checkStatus)
            .then(parseJSON)
            .then(data=> {
                dispatch({
                    type: constants.FIND_ALL_GROUP,
                    groups: data.data.groups
                });
                resolve && resolve();
            })
            .catch(
                error => {
                console.log(error);
                reject && reject();
            }
        );
    }
};

/** component operate **/
export function selectGroup(groupKey) {
    return {
        type: constants.SELECT_GROUP,
        groupKey
    }
};