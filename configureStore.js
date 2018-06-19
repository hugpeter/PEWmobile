import { compose, createStore, applyMiddleware } from 'redux';
import { cacheEnhancer }  from 'redux-cache';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk), 
            cacheEnhancer()
        )
    );
}