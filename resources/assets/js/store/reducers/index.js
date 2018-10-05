import {combineReducers} from 'redux'
import Auth from './Auth'
import Posts from './Posts'
import Users from './Users'

const RootReducer = combineReducers({Auth, Posts, User: Users});

export default RootReducer;