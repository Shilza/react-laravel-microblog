import Http from '../../Http'
import * as action from '../../store/actions/index'

export function createPost(payload) {
    return dispatch => (
        Http.post('api/posts/create', payload)
            .then((res) => {
                dispatch(action.addPost(res.data.newPost));
            })
            .catch(err => err)
    );
}

export function feed() {
    return dispatch => (
        Http.get('api/feed')
            .then((res) => {
                dispatch(action.setPosts(res.data.posts));
            })
    )
}

export function deletePost(payload) {
    return dispatch => (
        Http.post('api/posts/delete', payload)
            .then(() => {
                dispatch(action.deletePost(payload.post_id));
            })
            .catch(err => err)
    );
}

export function deleteComment(payload) {
    return dispatch => (
        Http.post('api/posts/comments/delete', payload)
            .then(() => {
                dispatch(action.deleteComment(payload));
            })
            .catch(err => err)
    );
}

export function postLike(payload) {
    return dispatch => (
        Http.post('api/posts/like', payload).then(() => dispatch(action.postLike(payload)))
    )
}

export function postUnlike(payload) {
    return dispatch => (
        Http.post('api/posts/unlike', payload).then(() => dispatch(action.postUnlike(payload)))
    )
}

export function commentLike(payload) {
    return dispatch => (
        Http.post('api/posts/comments/like', payload).then(() => dispatch(action.commentLike(payload)))
    )
}

export function commentUnlike(payload) {
    return dispatch => (
        Http.post('api/posts/comments/unlike', payload).then(() => dispatch(action.commentUnlike(payload)))
    )
}

export function getComments(payload) {
    const data = '=' + payload.owner_id + '&post_id=' + payload.post_id;

    return dispatch => (
        Http.get('api/posts/comments?owner_id' + data)
            .then(res => {
                dispatch(action.setComments(res.data.comments));
            })
    )
}

export function createComment(payload) {
    return dispatch => (
        Http.post('api/posts/comments/create', payload)
            .then(res => {
                dispatch(action.addComment(res.data.comment));
            })
    )
}