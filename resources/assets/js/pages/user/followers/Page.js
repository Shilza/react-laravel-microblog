import React, {Fragment} from 'react'
import MainPage from "../MainPage";
import {Card} from "semantic-ui-react";
import {FollCard} from "../FollCard";
import {connect} from 'react-redux'
import UsersService from "../../../services/Users";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

class Page extends React.Component {

    componentDidMount() {
        this.props.getFollowers(this.props.match.params.user);
    }

    render() {
        const {
            match,
            followers
        } = this.props;

        return (
            <MainPage userLink={match.params.user}>
                <Fragment>
                    <Card.Group itemsPerRow={3}>
                        {
                            followers.map((item, i) => <FollCard {...item} key={i}/>)
                        }
                    </Card.Group>
                </Fragment>
            </MainPage>
        );
    }
}

Page.propTypes = {
    followers: PropTypes.array.isRequired,
    getFollowers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        followers: state.User.followers
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getFollowers: UsersService.getFollowers,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Page)