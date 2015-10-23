/**
 * @module constants
 * @author Rube
 * @date 15/10/21
 * @desc 常量列表
 */

/** GROUP **/
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const FIND_GROUP = 'FIND_GROUP';
export const FIND_ALL_GROUP = 'FIND_ALL_GROUP';

export const SELECT_GROUP = 'SELECT_GROUP';

/** SERVER **/
export const API_CREDENTIALS = 'include';
export const GROUP_API_FIND = (groupKey, groupType) => `/g/${groupKey}?groupType=${groupType}`;
export const GROUP_API_FINDALL = (groupType) => `/g/all?groupType=${groupType}`;
export const GROUP_API_ADD = (groupName, groupType) => `/g/${groupName}/post?groupType=${groupType}`;
export const GROUP_API_UPDATE = (groupKey, groupType) => `/g/${groupKey}/put?groupType=${groupType}`;
export const GROUP_API_REMOVE = (groupKey, groupType) => `/g/${groupKey}/delete?groupType=${groupType}`;

/** CONFIG **/
export const TIMEOUT = 1000;


