import {applyMiddleware,createStore} from 'redux'
import RootReducer from './reducers'
import ReduxThunk from 'redux-thunk'
import * as Middlewares from './middlewares'

const store = createStore(
    RootReducer,
    applyMiddleware(ReduxThunk, Middlewares.logout)
);

export default store;
