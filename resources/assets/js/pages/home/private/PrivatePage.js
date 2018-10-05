import React from "react";
import {Grid} from "semantic-ui-react";
import UserPostsComponent from "./UserPostsComponent";
import UserInfoCard from "./UserInfoCard";
import RecommendedUsers from "./RecommendedUsers";
import {connect} from "react-redux";
import PostsService from "../../../services/Posts";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

class PrivatePage extends React.Component{

    componentDidMount(){
        this.props.getFeed();
    }

    render(){
        const style = {marginTop: '1%', marginBottom: '1%', marginLeft: '2%'};
        const {
            userId,
            posts
        } = this.props;

        return (
            <Grid style={style}>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <UserInfoCard/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <UserPostsComponent
                            posts={posts}
                            userId={userId}
                        />
                    </Grid.Column>
                    <Grid.Column width={5} floated='right'>
                        <RecommendedUsers/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

PrivatePage.propTypes = {
    posts: PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired,
    getFeed: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        posts: state.Posts.posts,
        userId: state.Auth.user.id
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getFeed: PostsService.feed,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePage);

