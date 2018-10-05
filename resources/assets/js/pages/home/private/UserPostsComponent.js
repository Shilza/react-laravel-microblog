import {Comment} from "semantic-ui-react";
import React from "react";
import InputContainer from "./InputContainer";
import {UsersFeedPost} from "./UsersFeedPost";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PostsService from "../../../services/Posts";
import PropTypes from 'prop-types';

class UserPostsComponent extends React.Component {

    constructor(props){
        super(props);

        this.createPost = this.createPost.bind(this);
    }

    //Do not refactor this, because InputContainer may get other onSubmit function
    createPost(payload){
        this.props.createPost(payload);
    }

    render() {
        const divStyle = {
            marginTop: '2%',
            marginBottom: '2%'
        }, inputStyle = {
            marginLeft: '2%',
            marginRight: '1%',
            marginBottom: '2%',
            minWidth: '75%'
        };

        const {
            customerId,
            userId,
            posts,
            getComments,
            createComment
        } = this.props;

        return (
            <div style={divStyle}>
                {
                    customerId === userId &&
                    <InputContainer
                        inputStyle={inputStyle}
                        onSubmit={this.createPost}
                    />
                }
                <Comment.Group>
                    {
                        posts.map(item =>
                            <UsersFeedPost
                                post={item}
                                key={item.owner_id + '.' +item.post_id}
                                createComment={createComment}
                                getComments={getComments}
                            />
                        )
                    }
                </Comment.Group>
            </div>
        );
    }
}

UserPostsComponent.propTypes = {
    customerId: PropTypes.number.isRequired,
    createPost: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        customerId: state.Auth.user.id,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        createPost: PostsService.createPost,
        getComments: PostsService.getComments,
        createComment: PostsService.createComment
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPostsComponent);