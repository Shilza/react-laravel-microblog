import * as ActionTypes from '../action-types'

const initialState = {
    user: null,
    followers: [],
    follows: [],
    recommendedUsers: [],
    searchResults: []
};

const Users = (state = initialState, {type, payload = null}) => {

    switch(type){
        case ActionTypes.FOLLOW:
            return follow(state, payload);
        case ActionTypes.UNFOLLOW:
            return unfollow(state, payload);
        case ActionTypes.SET_USER:
            return setUser(state, payload);
        case ActionTypes.SET_RECOMMENDED_USERS:
            return setRecommendedUsers(state, payload);
        case ActionTypes.SET_FOLLOWERS:
            return setFollowers(state, payload);
        case ActionTypes.SET_FOLLOWS:
            return setFollows(state, payload);
        case ActionTypes.SET_SEARCH_RESULTS:
            return setSearchResults(state, payload);
        default:
            return state;
    }
};

const follow = (state, payload) => {
    let newUser = {...state.user};
    if(newUser.id === payload)
        newUser.isFollowed = true;
    let newRecommended = state.recommendedUsers.map((item) => {
        if(item.id === payload)
            item.isFollowed = true;
        return item;
    });

    state = {
        ...state,
        user: newUser,
        recommendedUsers: newRecommended
    };

    return state;
};

const unfollow = (state, payload) => {
    let newUser = {...state.user};
    if(newUser.id === payload)
        newUser.isFollowed = false;
    let newRecommended = state.recommendedUsers.map((item) => {
        if(item.id === payload)
            item.isFollowed = false;
        return item;
    });

    state = {
        ...state,
        user: newUser,
        recommendedUsers: newRecommended
    };

    return state;
};

const setUser = (state, payload) => {
    state = {
        ...state,
        user: payload,
    };

    return state;
};

const setRecommendedUsers = (state, payload) => {
    state = {
        ...state,
        recommendedUsers: payload
    };

    return state;
};

const setFollowers = (state, payload) => {
    state = {
        ...state,
        followers: payload
    };

    return state;
};

const setFollows = (state, payload) => {
    state = {
        ...state,
        follows: payload
    };

    return state;
};

const setSearchResults = (state, payload) => {
    state = {
        ...state,
        searchResults: payload
    };

    return state;
};

export default Users;
