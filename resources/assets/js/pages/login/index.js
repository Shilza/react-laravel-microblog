import {connect} from 'react-redux'
import Page from './Page'
import PostService from "../../services/Posts";
import Users from "../../services/Users";
import User from "../../services/User";
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        feed: PostService.feed,
        getRecommendedUsers: Users.getRecommendedUsers,
        login: User.login
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Page)