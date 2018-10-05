import {bindActionCreators} from "redux";
import React from "react";
import UsersService from "../../../services/Users";
import User from "../../../services/User";
import {connect} from "react-redux";
import {Button, Grid, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

class RecommendedUserCard extends React.Component {
    constructor(props) {
        super(props);

        this.onUserClick = this.onUserClick.bind(this);
        this.onFollowClick = this.onFollowClick.bind(this);
    }

    onUserClick() {
        const {name, getUser} = this.props;
        getUser(name);
    }

    onFollowClick() {
        const {
            id,
            isFollowed,
            unFollow,
            follow
        } = this.props;

        if (isFollowed)
            unFollow(id);
        else
            follow(id);
    }

    render() {
        const {
            name,
            about,
            avatar,
            isFollowed
        } = this.props;

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Image src={avatar} circular/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Link to={'/' + name} onClick={this.onUserClick}>{name}</Link>
                            </Grid.Column>
                            <Grid.Column floated={'right'}>
                                <Button
                                    basic
                                    size={'mini'}
                                    onClick={this.onFollowClick}
                                >
                                    {isFollowed ? 'Unfollow' : 'Follow'}
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <p>{about}</p>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

RecommendedUserCard.propTypes = {
    getUser: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    unFollow: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUser: UsersService.getUser,
        follow: User.follow,
        unFollow: User.unFollow
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(RecommendedUserCard);