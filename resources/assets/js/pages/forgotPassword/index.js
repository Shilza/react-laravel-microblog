import {connect} from 'react-redux'
import Page from './Page'
import AuthService from '../../services/User/index'
import {bindActionCreators} from "redux/";

const mapStateToProps = state => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        resetPassword: AuthService.resetPassword
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Page)