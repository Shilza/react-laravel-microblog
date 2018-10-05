import React from "react";
import {Menu} from "semantic-ui-react";
import UsersDropdown from "./UsersDropdown";
import NotificationsMenu from "./NotificationsMenu";

export const RightMenu = () => {
    return (
        <Menu.Item position='right'>
            <NotificationsMenu/>
            <UsersDropdown/>
        </Menu.Item>
    );
};