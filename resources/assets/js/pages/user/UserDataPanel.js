import React from "react";
import {Container, Grid} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import UsersService from "../../services/Users";
import PropTypes from "prop-types";

const UserDataPanel = props => {

    const {
        postsCount,
        followersCount,
        followsCount,
        likedCount,
        name
    } = props.user;

    return (
        <Container>
            <Grid columns='equal' style={{textAlign: 'center'}}>
                <Grid.Column width={3}>
                    <Grid.Row>
                        <Link to={'/' + name}>Posts
                        </Link>
                    </Grid.Row>
                    <Grid.Row>
                        <div>{postsCount}</div>
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column>
                    <Grid.Row>
                        <Link to={'/' + name + '/followers'}>Followers
                        </Link>
                    </Grid.Row>
                    <Grid.Row>
                        <div>{followersCount}</div>
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column>
                    <Grid.Row>
                        <Link to={'/' + name + '/follows'}>Follows
                        </Link>
                    </Grid.Row>
                    <Grid.Row>
                        <div>{followsCount}</div>
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column>
                    <Grid.Row>
                        <Link to={'/' + name + '/liked'}>Liked
                        </Link>
                    </Grid.Row>
                    <Grid.Row>
                        <div>{likedCount}</div>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

UserDataPanel.propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getFollowers: PropTypes.func.isRequired,
    getFollows: PropTypes.func.isRequired,
    getLiked: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.User.user
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUser: UsersService.getUser,
        getFollowers: UsersService.getFollowers,
        getFollows: UsersService.getFollows,
        getLiked: UsersService.getLiked,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDataPanel)