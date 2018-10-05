import * as ActionTypes from '../action-types'

const initialState = {
    posts: []
};

const Posts = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_POSTS:
            return setPosts(state, payload);
        case ActionTypes.SET_USER:
            return changeAvatars(state, payload);
        case ActionTypes.POST_LIKE:
            return postLike(state, payload);
        case ActionTypes.POST_UNLIKE:
            return postUnlike(state, payload);
        case ActionTypes.ADD_POST:
            return addPost(state, payload);
        case ActionTypes.DELETE_POST:
            return deletePost(state, payload);
        case ActionTypes.SET_COMMENTS:
            return setComments(state, payload);
        case ActionTypes.ADD_COMMENT:
            return addComment(state, payload);
        case ActionTypes.DELETE_COMMENT:
            return deleteComment(state, payload);
        case ActionTypes.COMMENT_LIKE:
            return commentLike(state, payload);
        case ActionTypes.COMMENT_UNLIKE:
            return commentUnlike(state, payload);
        case ActionTypes.SET_LIKED_POSTS:
            return setLikedPosts(state, payload);
        default:
            return state;
    }
};

const setLikedPosts = (state, payload) => {
    state = {
        ...state,
        posts: payload
    };

    return state;
};

const changeAvatars = (state, payload) => {
    state = {
        posts: state.posts.map(item => {
            if(item.owner_id === payload.id)
                item.avatar = payload.avatar;
            return item;
        })
    };

    return state;
};


const setPosts = (state, payload) => {
    state = {
        posts: payload,
    };

    return state;
};

const postLike = (state, payload) => {
    const newPosts = state.posts.map(item => {
            if (item.post_id === payload.post_id && item.owner_id === payload.owner_id) {
                item.isLiked = true;
                item.likesCount++;
            }
            return item;
        }
    );

    state = {
        posts: newPosts
    };

    return state;
};

const postUnlike = (state, payload) => {
    const newPosts = state.posts.map(item => {
            if (item.post_id === payload.post_id && item.owner_id === payload.owner_id) {
                item.isLiked = false;
                item.likesCount--;
            }
            return item;
        }
    );

    state = {
        posts: newPosts
    };

    return state;
};

const commentLike = (state, payload) => {
    const newPosts = state.posts.map((post) => {
        if (post.post_id === payload.post_id){
            post.commenst = post.comments.map((comment) => {
                if (comment.owner_id === payload.owner_id &&
                    comment.comment_id === payload.comment_id){
                    comment.isLiked = true;
                    comment.likesCount++;
                }

                return comment;
            });
        }

        return post;
    });

    state = {
        posts: newPosts
    };

    return state;
};

const commentUnlike = (state, payload) => {
    const newPosts = state.posts.map((post) => {
        if (post.post_id === payload.post_id){
            post.commenst = post.comments.map((comment) => {
                if (comment.owner_id === payload.owner_id &&
                    comment.comment_id === payload.comment_id){
                    comment.isLiked = false;
                    comment.likesCount--;
                }

                return comment;
            });
        }

        return post;
    });

    state = {
        posts: newPosts
    };

    return state;
};

const addPost = (state, payload) => {
    let newPosts = [...state.posts];
    newPosts.unshift(payload);

    state = {
        posts: newPosts
    };

    return state;
};

const deletePost = (state, payload) => {
    let newPosts = state.posts.filter(item => {
        if(item.post_id !== payload)
            return item;
    });

    state = {
        posts: newPosts
    };

    return state;
};

const deleteComment = (state, payload) => {
    let newPosts = state.posts.map(post => {
        if(post.post_id === payload.post_id)
            post.comments = post.comments.filter(comment => {
                if(comment.comment_id !== payload.comment_id)
                    return comment;
            });
        return post;
    });

    state = {
        posts: newPosts
    };

    return state;
};

const setComments = (state, payload) => {
    let newPosts = [...state.posts];

    if (payload.length)
        newPosts.map((item) => {
            if (item.post_id === payload[0].post_id){
                item.comments = payload;
            }
        });

    state = {
        ...state,
        posts: newPosts
    };

    return state;
};

const addComment = (state, payload) => {

    let newPosts = [...state.posts];
    newPosts.map((item) => {
        if (item.post_id === payload.post_id && item.comments){
            item.comments.unshift(payload);
        }
        else if(item.post_id === payload.post_id)
            item.comments = new Array(payload)
    });

    state = {
        posts: newPosts
    };

    return state;
};

export default Posts;
