import * as ActionTypes from '../action-types'

const initialState = {
    isAuthenticated : false,
    notifications: [],
    user: {}
};

const Auth = (state = initialState, {type, payload = null}) => {
    switch(type){
        case ActionTypes.AUTH_LOGIN:
            return authLogin(state,payload);
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        case ActionTypes.AUTH_ME:
            return authMe(state, payload);
        case ActionTypes.SET_NOTIFICATIONS:
            return setNotifications(state, payload);
        case ActionTypes.DELETE_NOTIFICATIONS:
            return deleteNotifications(state);
        default:
            return state;
    }
};

const authLogin = (state, payload) => {
    state = {
        ...state,
        isAuthenticated: true,
        user: payload
    };

    return state;
};

const authMe = (state, payload) => {
    state = {
        ...state,
        isAuthenticated: true,
        user: payload
    };

    return state;
};

const logout = (state) => {
    state = {
        ...state,
        isAuthenticated: false
    };

    return state;
};

const setNotifications = (state, payload) => {
    state = {
        ...state,
        notifications: payload
    };

    return state;
};

const deleteNotifications = (state) => {
    let newUser = {...state.user};
    newUser.notificationsCount = 0;

    state = {
        ...state,
        notifications: [],
        user: newUser
    };

    return state;
};

export default Auth;
