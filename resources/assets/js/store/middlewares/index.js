import * as ActionTypes from "../action-types";
import store from "../index";

export const logout = store => next => action => {
    if(action.type === ActionTypes.AUTH_LOGOUT){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
    }
    return next(action);
};