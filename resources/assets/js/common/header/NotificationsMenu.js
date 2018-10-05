import React from "react";
import PropTypes from "prop-types";
import {Label} from "semantic-ui-react";
import {bindActionCreators} from "redux";
import {deleteNotifications, getNotifications} from "../../services/User/userService";
import {connect} from "react-redux";
import NotificationsDropdown from "./NotificationsDropdown";

class NotificationsMenu extends React.Component {

    constructor(props){
        super(props);

        this.onNotificationsClick = this.onNotificationsClick.bind(this);
        this.onNotificationsBlur = this.onNotificationsBlur.bind(this);
    }

    onNotificationsClick() {
        if (this.props.notificationsCount > 0)
            this.props.getNotifications();
    }

    onNotificationsBlur() {
        if (this.props.notificationsCount > 0)
            this.props.deleteNotifications();
    }

    render(){
        const {
            notificationsCount,
        } = this.props;

        return (
            <div>
                {
                    (notificationsCount > 0) &&
                    <Label color='red' circular>
                        {notificationsCount}
                    </Label>
                }
                <NotificationsDropdown
                    onNotificationsClick={this.onNotificationsClick}
                    onNotificationsBlur={this.onNotificationsBlur}
                />
            </div>
        );
    }
}

NotificationsMenu.propTypes = {
    notificationsCount: PropTypes.number.isRequired,
    getNotifications: PropTypes.func.isRequired,
    deleteNotifications: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        notificationsCount: state.Auth.user.notificationsCount,
        notifications: state.Auth.user.notifications
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getNotifications: getNotifications,
        deleteNotifications: deleteNotifications,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsMenu);

