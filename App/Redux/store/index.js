import {compose, createStore} from 'redux';
import reducers from './../reducers';
import {persistStore} from 'redux-persist';

const store = createStore(
    reducers,
    undefined,
    compose(
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
