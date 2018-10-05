import React from "react";
import {Link} from "react-router-dom";
import {Button} from "semantic-ui-react";
import {Menu} from "semantic-ui-react";

export const AuthBar = () => {
    const buttonStyle = {marginLeft: '0.5em'};

    return (
        <Menu.Item position='right'>
            <Button as={Link} to="/login" inverted>
                Log in
            </Button>
            <Button as={Link} to="/register" style={buttonStyle} inverted>
                Sign Up
            </Button>
        </Menu.Item>
    );
};