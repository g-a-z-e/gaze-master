/**
 * @module
 * @author Rube
 * @date 15/10/25
 * @desc
 */
import reduxThunkMilleware from '../middleware/redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootStates from './states';
import rootReducers from '../reducers/index';

const finalCreateStore = applyMiddleware(reduxThunkMilleware)(createStore);

export default initialState => {
    if (initialState) {
        return finalCreateStore(rootReducers, initialState);
    }
    return finalCreateStore(rootReducers, rootStates);
}