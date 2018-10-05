import {Card, Container, Grid, Image} from "semantic-ui-react";
import React from "react";
import {bindActionCreators} from "redux";
import UsersService from "../../../services/Users";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const UserInfoCard = props => {

    const linkStyle = {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    }, aboutStyle = {
        color: 'gray',
        opacity: '0.9',
        fontSize: 'small',
        wordWrap: 'break-word'
    }, alignText = {
        textAlign: 'center'
    };
    const {
        name,
        avatar,
        postsCount,
        followersCount,
        followsCount,
        about
    } = props.user;

    return (
        <Card>
            <Card.Content>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Image src={avatar} circular/>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Grid.Row>
                                <Link to={'/' + name}>{name}</Link>
                            </Grid.Row>
                            <Grid.Row>
                                <Container style={aboutStyle}>{about}</Container>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Grid.Row>
                                <Link to={'/' + name} style={linkStyle}>Posts</Link>
                            </Grid.Row>
                            <Grid.Row>
                                <Container style={alignText}>{postsCount}</Container>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Grid.Row>
                                <Link to={'/' + name + '/followers'} style={linkStyle}>
                                    Followers
                                </Link>
                            </Grid.Row>
                            <Grid.Row>
                                <Container style={alignText}>{followersCount}</Container>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Grid.Row>
                                <Link to={'/' + name + '/follows'} style={linkStyle}>
                                    Follows
                                </Link>
                            </Grid.Row>
                            <Grid.Row>
                                <Container style={alignText}>{followsCount}</Container>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
        </Card>
    );
};

UserInfoCard.propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getFollowers: PropTypes.func.isRequired,
    getFollows: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.Auth.user,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUser: UsersService.getUser,
        getFollowers: UsersService.getFollowers,
        getFollows: UsersService.getFollows,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoCard);