import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './../reducers';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger'

const store = createStore(
    reducers,
    undefined,
    compose(
        applyMiddleware(logger)

    )
);

persistStore(
    store,
    null,
    () => {
        store.getState() // if you want to get restoredState
    }
)


export default store;
