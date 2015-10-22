/**
 * @module
 * @author Rube
 * @date 15/10/25
 * @desc
 */
export default function thunkMiddleware({ dispatch, getState }) {
    return next => action =>
        typeof action === 'function' ?
            action(dispatch, getState) :
            next(action);
}