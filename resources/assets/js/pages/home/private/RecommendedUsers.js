import {Card} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UsersService from "../../../services/Users";
import RecommendedUserCard from "./RecommendedUserCard";
import PropTypes from 'prop-types';

class RecommendedUsers extends React.PureComponent{

    componentDidMount(){
        this.props.getRecommendedUsers();
    }

    render(){
        const {recommendedUsers} = this.props;

        return (
            <Card>
                <Card.Content>
                    <Card.Header>Recommended users</Card.Header>
                </Card.Content>
                <Card.Content>
                    {recommendedUsers.map((item, i) =>
                        <RecommendedUserCard {...item} key={i}/>
                    )
                    }
                </Card.Content>
            </Card>
        );
    }
}

RecommendedUsers.propTypes = {
    recommendedUsers: PropTypes.array.isRequired,
    getRecommendedUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        recommendedUsers: state.User.recommendedUsers
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getRecommendedUsers: UsersService.getRecommendedUsers,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUsers);