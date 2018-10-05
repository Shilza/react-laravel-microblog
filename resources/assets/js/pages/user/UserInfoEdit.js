import React from "react";
import {Button, Grid, Image, Input, Message, TextArea} from "semantic-ui-react";
import {Uploader} from "./Uploader";
import ReeValidate from "ree-validate";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import User from "../../services/User";

class UserInfoEdit extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            name: 'required|min:3|max:16',
            about: 'max:140'
        });

        this.state = {
            credentials: {
                name: props.user.name,
                about: props.user.about || ''
            },
            errors: this.validator.errors,
            nameValueError: false,
            aboutValueError: false,
            isUploadShown: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showUploader = this.showUploader.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const {errors} = this.validator;
        const {credentials} = this.state;
        credentials[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, credentials})
            });
    }

    showUploader() {
        this.setState({isUploadShown: true});
    }

    onSubmit() {
        event.preventDefault();
        const {credentials} = this.state;
        const {
            updateUser,
            editSubmit
        } = this.props;

        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    updateUser({username: credentials.name, about: credentials.about});
                    editSubmit();
                }
            });
    }

    render() {
        const mainStyle = {
            backgroundColor: '#FAFAFA',
            padding: '4%',
            borderRadius: '4%'
        }, textAreaStyle = {
            width: '94%',
            borderRadius: '4%'
        }, gridStyle = {
            marginTop: '2%'
        }, imageStyle = {
            maxHeight: '120px',
            maxWidth: '120px'
        };

        const {
            credentials,
            errors,
            isUploadShown
        } = this.state;

        return (
            <div style={mainStyle}>
                <Grid centered style={gridStyle}>
                    <Grid.Row height={1}>
                        {isUploadShown ? <Uploader/> :
                            <Image
                                style={imageStyle}
                                src={this.props.user.avatar}
                                circular
                                size='small'
                                onClick={this.showUploader}
                            />
                        }
                    </Grid.Row>
                    <Grid.Row>
                        <Input
                            name={'name'}
                            value={credentials.name}
                            size={'mini'}
                            onChange={this.handleChange}
                        />
                        {
                            errors.has('name') &&
                            <Message size='tiny' negative>
                                <Message.Content>
                                    {errors.first('name')}
                                </Message.Content>
                            </Message>
                        }
                    </Grid.Row>
                    <Grid.Row>
                        <TextArea style={textAreaStyle}
                                  autoHeight
                                  onChange={this.handleChange}
                                  value={credentials.about}
                                  placeholder={'About'}
                                  rows={4}
                                  name={'about'}
                        />
                        {
                            errors.has('about') &&
                            <Message size='tiny' negative>
                                <Message.Content>
                                    {errors.first('about')}
                                </Message.Content>
                            </Message>
                        }
                    </Grid.Row>
                    <Grid.Row>
                        <Button
                            color={'black'}
                            onClick={this.props.deleteProfile}
                            size={'mini'}>
                            Delete profile
                        </Button>
                        <Button
                            color={'black'}
                            onClick={this.onSubmit}
                            size={'mini'}>
                            Ok
                        </Button>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

UserInfoEdit.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.Auth.user,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteProfile: User.deleteProfile
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoEdit);

