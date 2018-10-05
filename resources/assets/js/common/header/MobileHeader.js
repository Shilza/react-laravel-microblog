import PropTypes from "prop-types";
import {Menu, Responsive} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Container, Segment} from "semantic-ui-react";
import React from "react";
import {AuthBar} from "./AuthBar";
import {RightMenu} from "./RightMenu";

export const MobileHeader = (props) => {
    const {isAuthenticated} = props;

    return (
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>

            <Segment
                inverted
                textAlign='center'
                style={{padding: '1em 0em'}}
                vertical
            >
                <Container>
                    <Menu inverted
                          pointing
                          secondary
                          size='large'
                    >
                        <Menu.Item as={Link} to={'/'}>Home</Menu.Item>
                        {isAuthenticated ? <RightMenu/> : <AuthBar/>}
                    </Menu>
                </Container>
            </Segment>
        </Responsive>
    );
};

MobileHeader.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};