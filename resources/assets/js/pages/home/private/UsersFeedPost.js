import React from "react";
import Post from "./Post";
import {Comments} from "./Comments";
import PropTypes from 'prop-types';

export class UsersFeedPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentsShow: false
        };

        this.onCommentClick = this.onCommentClick.bind(this);
        this.createComment = this.createComment.bind(this);
    }

    createComment(text) {
        const {
            owner_id,
            post_id
        } = this.props.post;

        this.props.createComment({
            ...text, owner_id, post_id
        });
    }

    onCommentClick() {
        if(!this.state.isCommentsShow){
            const {
                owner_id,
                post_id
            } = this.props.post;

            this.props.getComments({owner_id, post_id});
        }

        this.setState(
            (prevState) => ({isCommentsShow: !prevState.isCommentsShow})
        );
    }

    render() {
        const {comments, ...rest} = this.props.post;

        return (
            <div>
                <Post
                    {...rest}
                    onCommentClick={this.onCommentClick}
                />
                {this.state.isCommentsShow &&
                    <Comments
                        createComment={this.createComment}
                        comments={comments}
                    />
                }
            </div>
        );
    }
}

UsersFeedPost.propTypes ={
    post: PropTypes.object.isRequired,
    createComment: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired
};