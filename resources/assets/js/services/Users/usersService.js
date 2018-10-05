import Http from '../../Http'
import * as action from '../../store/actions/index'

export function getUser(payload) {
    return dispatch => (
        Http.get('api/user?username=' + payload)
            .then((res) => {
                dispatch(action.setUser(res.data.user));
                dispatch(action.setPosts(res.data.posts));
            })
            .catch(err => err)
    )
}

export function getRecommendedUsers() {
    return dispatch => (
        Http.get('api/recommended')
            .then((res) => {
                dispatch(action.setRecommendedUsers(res.data.users));
            })
            .catch(err => err)
    )
}

export function updateUser(payload) {
    return dispatch => {
        Http.post('api/update_user', payload)
            .then((res) => {
                dispatch(action.setUser(res.data.user));
            })
    }
}

export function getFollowers(payload) {
    return dispatch => (
        Http.get('api/followers?username=' + payload)
            .then((res) => {
                dispatch(action.setFollowers(res.data.followers));
            })
            .catch(err => err)
    )
}

export function getFollows(payload) {
    return dispatch => (
        Http.get('api/follows?username=' + payload)
            .then((res) => {
                dispatch(action.setFollows(res.data.follows));
            })
            .catch(err => err)
    )
}

export function getLiked(payload) {
    return dispatch => (
        Http.get('api/liked?username=' + payload)
            .then((res) => {
                dispatch(action.setLikedPosts(res.data.posts));
            })
            .catch(err => err)
    )
}

export function search(payload) {
    return dispatch => (
        Http.get('api/search?username=' + payload)
            .then((res) => {
                dispatch(action.setSearchResults(res.data.users));
            })
            .catch(err => err)
    )
}