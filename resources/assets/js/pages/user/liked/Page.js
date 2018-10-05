import React from 'react'
import MainPage from "../MainPage";
import UserPostsComponent from "../../home/private/UserPostsComponent";
import {connect} from 'react-redux'
import UsersService from "../../../services/Users";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

class Page extends React.Component{

    componentDidMount(){
        this.props.getLiked(this.props.match.params.user);
    }

    render(){

        return (
            <MainPage userLink={this.props.match.params.user}>
                <UserPostsComponent/>
            </MainPage>
        );
    }
}

Page.propTypes = {
    getLiked: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getLiked: UsersService.getLiked,
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Page)