import React from "react";
import {Button, Grid, Header, Icon, Image} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import User from "../../services/User";
import PropTypes from "prop-types";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditHide: true
        };

        this.EditShow = this.EditShow.bind(this);
        this.editHide = this.editHide.bind(this);
        this.onFollowClick = this.onFollowClick.bind(this);
    }

    EditShow() {
        this.setState({isEditHide: false});
    }

    editHide() {
        this.setState({isEditHide: true});
    }

    onFollowClick() {
        const {id, isFollowed} = this.props.user;

        if (isFollowed)
            this.props.unFollow(id);
        else
            this.props.follow(id);
    }

    render() {

        const mainStyle = {
            backgroundColor: '#FAFAFA',
            padding: '4%',
            borderRadius: '4%',
            textAlign: 'center'
        }, editIconStyle = {
            position: 'absolute',
            left: '85%'
        }, gridStyle = {
            marginTop: '1%',
            marginBottom: '1%'
        }, imageStyle = {
            left: '25%'
        }, aboutStyle = {
            wordWrap: 'break-word'
        };
        const {isEditHide} = this.state;
        const {customerId} = this.props;
        const {id, name, about, avatar, isFollowed} = this.props.user;

        return (
            <div style={mainStyle}
                 onMouseOver={this.EditShow}
                 onMouseLeave={this.editHide}
            >
                {
                    (!isEditHide && customerId === id) &&
                    <Icon
                        name={'edit outline'}
                        size={'large'}
                        style={editIconStyle}
                        onClick={this.props.editUserInfo}
                        link
                    />
                }
                <Image
                    src={avatar}
                    circular
                    size='small'
                    style={imageStyle}
                />
                {
                    customerId !== id ?
                        <Grid style={gridStyle}>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Header as={'h2'}>{name}</Header>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Button basic onClick={this.onFollowClick}>
                                        {isFollowed ? "Unfollow" : "Follow"}
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid> :
                        <Header as={'h2'}>{name}</Header>
                }
                <span style={aboutStyle}>{about}</span>
            </div>
        );
    }
}

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    customerId: PropTypes.number.isRequired,
    follow: PropTypes.func.isRequired,
    unFollow: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.User.user,
        customerId: state.Auth.user.id
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        follow: User.follow,
        unFollow: User.unFollow
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);