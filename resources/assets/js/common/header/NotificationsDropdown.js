import {Dropdown} from "semantic-ui-react";
import React from "react";
import Notification from "./Notification";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const NotificationsDropdown = (props) => {

    const dropdownStyle = {marginRight: '1em'};

    return (
        <Dropdown
            icon={'bell outline'}
            pointing='top right'
            className='icon'
            onClick={props.onNotificationsClick}
            onBlur={props.onNotificationsBlur}
            style={dropdownStyle}
        >
            <Dropdown.Menu>
                <Dropdown.Header content='Notifications'/>
                {props.notifications.map((item, i) =>
                    <Notification {...item} key={i}/>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

NotificationsDropdown.propTypes = {
    notifications: PropTypes.array.isRequired,
    onNotificationsClick: PropTypes.func.isRequired,
    onNotificationsBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        notifications: state.Auth.notifications
    }
};

export default connect(mapStateToProps)(NotificationsDropdown);