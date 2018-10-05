import React from "react";
import {Comment, Feed, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PostsService from "../../../services/Posts";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

class PostComment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDeleteCommentShow: false
        };

        this.onLikeClick = this.onLikeClick.bind(this);
        this.onReplyClick = this.onReplyClick.bind(this);
        this.deleteCommentShow = this.deleteCommentShow.bind(this);
        this.deleteCommentHide = this.deleteCommentHide.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteCommentShow() {
        const {
            owner_id,
            customerId,
            commentator_id
        } = this.props;
        if(owner_id === customerId || commentator_id === customerId)
            this.setState({isDeleteCommentShow: true});
    }

    deleteCommentHide() {
        this.setState({isDeleteCommentShow: false});
    }

    deleteComment() {
        const {
            deleteComment,
            post_id,
            owner_id,
            comment_id
        } = this.props;

        deleteComment({post_id, owner_id, comment_id});
        this.setState({isDeleteCommentShow: false});
    }

    onLikeClick() {
        const {
            owner_id,
            post_id,
            comment_id,
            commentLike,
            commentUnlike,
            isLiked
        } = this.props;

        if (isLiked)
            commentUnlike({owner_id, post_id, comment_id});
        else
            commentLike({owner_id, post_id, comment_id});
    }

    onReplyClick() {
        const {
            onReplyClick,
            commentator_id,
            name
        } = this.props;

        onReplyClick({
            reply_to_id: commentator_id,
            reply_name: name
        });
    }

    render() {
        const {
            name,
            avatar,
            created_at,
            likesCount,
            reply_name,
            text,
            isLiked
        } = this.props;

        const deleteIconStyle = {marginLeft: '100%'};
        const date = new Date(created_at * 1000);
        const postTime = date.getHours() + ':' + date.getMinutes();

        return (
            <Comment
                onMouseOver={this.deleteCommentShow}
                onMouseLeave={this.deleteCommentHide}
            >
                <Comment.Avatar src={avatar}/>
                <Comment.Content>
                    <Comment.Author as='a'>{name}</Comment.Author>
                    <Comment.Metadata>
                        <span>{postTime}</span>
                        {
                            reply_name &&
                            <span>Reply to
                                <Link to={'/' + reply_name}> {reply_name}</Link>
                            </span>
                        }
                    </Comment.Metadata>
                    {
                        this.state.isDeleteCommentShow &&
                        <Icon
                            onClick={this.deleteComment}
                            style={deleteIconStyle}
                            name='close'
                            link
                        />
                    }
                    <Comment.Text>{text}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Metadata>
                            <Feed size='small'>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Meta>
                                            <Feed.Like onClick={this.onLikeClick}>
                                                {
                                                    isLiked ?
                                                        <Icon className='red like icon' name='like'/> :
                                                        <Icon name='like'/>
                                                }
                                                {likesCount === 0 ? '' : likesCount}
                                            </Feed.Like>
                                            <a onClick={this.onReplyClick}>Reply</a>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Comment.Metadata>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        );
    }
}

PostComment.propTypes = {
    customerId: PropTypes.number.isRequired,
    owner_id: PropTypes.number.isRequired,
    commentLike: PropTypes.func.isRequired,
    commentUnlike: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        customerId: state.Auth.user.id
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        commentLike: PostsService.commentLike,
        commentUnlike: PostsService.commentUnlike,
        deleteComment: PostsService.deleteComment
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);