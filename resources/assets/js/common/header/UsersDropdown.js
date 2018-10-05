import {Dropdown, Image} from "semantic-ui-react";
import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from "../../store/actions";

const UsersDropdown = ({avatarLink, name, logout}) => {
    const avatar = (
        <span>
            <Image avatar src={avatarLink}/>
        </span>
    );

    return (
        <Dropdown trigger={avatar} pointing='top right' className='user-dropdown'>
            <Dropdown.Menu>
                <Dropdown.Item
                    text={"Signed in as " + name}
                    disabled
                    key='user'
                />
                <Dropdown.Item onClick={logout} text="logout" icon='sign out'
                               key='logout'/>
            </Dropdown.Menu>
        </Dropdown>
    );
};

const mapStateToProps = state => {
    return {
        avatarLink: state.Auth.user.avatar,
        name: state.Auth.user.name,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logout: actions.authLogout,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDropdown);

