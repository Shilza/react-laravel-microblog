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
        this.props.getFollows(this.props.match.params.user);
    }

    render() {
        const {
            match,
            follows
        } = this.props;

        return (
            <MainPage userLink={match.params.user}>
                <Fragment>
                    <Card.Group itemsPerRow={3}>
                        {
                            follows.map((item, i) => <FollCard {...item} key={i}/>)
                        }
                    </Card.Group>
                </Fragment>
            </MainPage>
        );
    }
}

Page.propTypes = {
    follows: PropTypes.array.isRequired,
    getFollows: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        follows: state.User.follows
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getFollows: UsersService.getFollows,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Page)