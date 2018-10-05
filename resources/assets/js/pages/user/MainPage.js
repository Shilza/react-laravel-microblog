import React, {Fragment} from 'react'
import {Container, Divider, Grid, Header} from "semantic-ui-react";
import UserInfoEdit from "./UserInfoEdit";
import UserInfo from "./UserInfo";
import RecommendedUsers from "../home/private/RecommendedUsers";
import UserDataPanel from "./UserDataPanel";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UsersService from "../../services/Users";
import PropTypes from "prop-types";

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: undefined,
            isEdit: false
        };

        this.hideIsEdit = this.hideIsEdit.bind(this);
        this.editUserInfo = this.editUserInfo.bind(this);
    }

    componentDidMount() {
        const {
            getUser,
            userLink
        } = this.props;

        getUser(userLink)
            .catch((err) => {
                if (err.response.status === 404)
                    this.setState({errors: "User not found"});
            });
    }

    hideIsEdit() {
        this.setState({isEdit: false});
    }

    editUserInfo() {
        this.setState({isEdit: true});
    }

    render() {
        const style = {margin: '1%'};
        const {
            user,
            children,
            posts
        } = this.props;
        const centralRowStyle = {
            marginBottom: '4%'
        }, errorsStyle = {
            minHeight: 500
        };
        const {errors, isEdit} = this.state;

        return (
            <Fragment>
                {user &&
                <Grid columns='equal' style={style}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            {
                                isEdit ?
                                    <UserInfoEdit editSubmit={this.hideIsEdit}/> :
                                    <UserInfo editUserInfo={this.editUserInfo}/>
                            }
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Grid.Row style={centralRowStyle}>
                                <UserDataPanel/>
                                <Divider/>
                            </Grid.Row>
                            <Grid.Row>
                                {
                                    React.cloneElement(children,
                                        {
                                            posts: posts,
                                            userId: user.id
                                        })
                                }
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={4} floated={'right'}>
                            <RecommendedUsers/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                }
                {
                    errors &&
                    <Container textAlign='center' style={errorsStyle}>
                        <Header as={'h1'}>{errors}</Header>
                    </Container>
                }
            </Fragment>
        );
    }
}

MainPage.propTypes = {
    user: PropTypes.object,
    posts: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.User.user,
        posts: state.Posts.posts
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUser: UsersService.getUser,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)