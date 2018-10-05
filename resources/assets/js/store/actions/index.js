import * as ActionTypes from '../action-types'

export function authLogin(payload){
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    }
}

export function authLogout(){
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export function authMe(payload){
    return {
        type:ActionTypes.AUTH_ME,
        payload
    }
}

export function follow(payload){
    return {
        type:ActionTypes.FOLLOW,
        payload
    }
}
export function unFollow(payload){
    return {
        type:ActionTypes.UNFOLLOW,
        payload
    }
}

export function setPosts(payload) {
    return{
        type: ActionTypes.SET_POSTS,
        payload
    }
}

export function addPost(payload) {
    return {
        type: ActionTypes.ADD_POST,
        payload
    }
}

export function deletePost(payload) {
    return {
        type: ActionTypes.DELETE_POST,
        payload
    }
}

export function deleteComment(payload) {
    return {
        type: ActionTypes.DELETE_COMMENT,
        payload
    }
}

export function postLike(payload) {
    return {
        type: ActionTypes.POST_LIKE,
        payload
    }
}

export function postUnlike(payload) {
    return {
        type: ActionTypes.POST_UNLIKE,
        payload
    }
}

export function commentLike(payload) {
    return {
        type: ActionTypes.COMMENT_LIKE,
        payload
    }
}

export function commentUnlike(payload) {
    return {
        type: ActionTypes.COMMENT_UNLIKE,
        payload
    }
}

export function setComments(payload) {
    return {
        type: ActionTypes.SET_COMMENTS,
        payload
    }
}

export function addComment(payload) {
    return {
        type: ActionTypes.ADD_COMMENT,
        payload
    }
}

export function setUser(payload) {
    return {
        type: ActionTypes.SET_USER,
        payload
    }
}

export function setRecommendedUsers(payload) {
    return {
        type: ActionTypes.SET_RECOMMENDED_USERS,
        payload
    }
}

export function setFollowers(payload) {
    return {
        type: ActionTypes.SET_FOLLOWERS,
        payload
    }
}

export function setFollows(payload) {
    return {
        type: ActionTypes.SET_FOLLOWS,
        payload
    }
}

export function setNotifications(payload) {
    return {
        type: ActionTypes.SET_NOTIFICATIONS,
        payload
    }
}

export function deleteNotifications() {
    return {
        type: ActionTypes.DELETE_NOTIFICATIONS
    }
}

export function setSearchResults(payload) {
    return {
        type: ActionTypes.SET_SEARCH_RESULTS,
        payload
    }
}

export function setLikedPosts(payload) {
    return {
        type: ActionTypes.SET_LIKED_POSTS,
        payload
    }
}