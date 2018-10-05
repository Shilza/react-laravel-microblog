import {Comment, Feed, Icon} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PostsService from "../../../services/Posts";
import PropTypes from 'prop-types';

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDeletePostShow: false
        };

        this.onPostLikeClick = this.onPostLikeClick.bind(this);
        this.deletePostShow = this.deletePostShow.bind(this);
        this.deletePostHide = this.deletePostHide.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePostShow() {
        if(this.props.owner_id === this.props.customerId)
        this.setState({isDeletePostShow: true});
    }

    deletePostHide() {
        this.setState({isDeletePostShow: false});
    }

    deletePost() {
        const {
            deletePost,
            post_id
        } = this.props;

        deletePost({post_id});
    }

    onPostLikeClick() {
        const {
            owner_id,
            post_id,
            isLiked,
            postUnlike,
            postLike
        } = this.props;

        if (isLiked)
            postUnlike({post_id, owner_id});
        else
            postLike({post_id, owner_id});
    }

    render() {
        const {
            likesCount,
            text,
            name,
            avatar,
            created_at,
            commentsCount,
            onCommentClick,
            isLiked
        } = this.props;
        const postStyle = {marginTop: '2%'};

        const deleteIconStyle = {marginLeft: '100%'};
        const date = new Date(created_at * 1000);
        const postTime = date.getHours() + ':' + date.getMinutes();

        return (
            <Comment
                style={postStyle}
                onMouseOver={this.deletePostShow}
                onMouseLeave={this.deletePostHide}>
                <Comment.Avatar src={avatar}/>
                <Comment.Content>

                    <Comment.Author as='a'>{name}</Comment.Author>

                    <Comment.Metadata>
                        <span>{postTime}</span>
                    </Comment.Metadata>
                    {
                        this.state.isDeletePostShow &&
                        <Icon
                            onClick={this.deletePost}
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
                                            <Feed.Like onClick={this.onPostLikeClick}>
                                                {
                                                    isLiked ?
                                                        <Icon className='red like icon' name='like'/> :
                                                        <Icon name='like'/>
                                                }
                                                {likesCount === 0 ? '' : likesCount}
                                            </Feed.Like>
                                            <Icon onClick={onCommentClick} name='comment outline'/>
                                            {commentsCount === 0 ? '' : commentsCount}
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

Post.propTypes = {
    customerId: PropTypes.number.isRequired,
    postUnlike: PropTypes.func.isRequired,
    postLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        customerId: state.Auth.user.id,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        postUnlike: PostsService.postUnlike,
        postLike: PostsService.postLike,
        deletePost: PostsService.deletePost
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);