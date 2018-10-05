import {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Container, Menu, Responsive, Segment, Visibility} from "semantic-ui-react";
import React from "react";
import SearchUsers from "./Search";
import {AuthBar} from "./AuthBar";
import {RightMenu} from "./RightMenu";

export default class DesktopHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fixes: false
        };

        this.hideFixedMenu = this.hideFixedMenu.bind(this);
        this.showFixedMenu = this.showFixedMenu.bind(this);
    }

    hideFixedMenu() {
        this.setState({fixed: false});
    };

    showFixedMenu() {
        this.setState({fixed: true});
    };

    render() {

        const {
            isAuthenticated,
        } = this.props;
        const {fixed} = this.state;

        return (
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{padding: '1em 0em'}}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item as={Link} to={'/'}>Home</Menu.Item>
                                {
                                    isAuthenticated &&
                                    <Menu.Item>
                                        <SearchUsers/>
                                    </Menu.Item>
                                }
                                {isAuthenticated ?
                                    <RightMenu/> : <AuthBar/>}
                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>
            </Responsive>
        )
    }
}

DesktopHeader.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};