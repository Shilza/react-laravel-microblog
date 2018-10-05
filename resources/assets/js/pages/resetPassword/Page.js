import React from 'react'
import {Button, Dimmer, Form, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import PageHeader from '../../common/pageHeader'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            password: 'required|min:6',
            password_confirmation: 'required|min:6',
            token: 'required',
            email: 'required'
        });
        this.state = {
            credentials: {
                password: '',
                password_confirmation: '',
                token: this.props.match.params.token,
                email: this.props.match.params.email.replace("29gnmLTv686QsnV", "@")
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            responseMessage: '',
            isSuccess: false,
            isLoading: false,
            errors: this.validator.errors,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {credentials} = this.state;
        credentials[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, credentials})
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {credentials} = this.state;


        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoading: true
                    });
                    this.submit(credentials);
                }
            });
    }

    submit(credentials) {
        this.props.updatePassword(credentials)
            .then((message)  => {
                this.setState({
                    isLoading: false,
                    isSuccess: true,
                    responseMessage: message
                });
            })
            .catch(({message, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: message
                };
                this.setState({
                    isLoading: false,
                    responseError
                });
            })
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' replace/>
        }

        const {
            errors,
            responseError,
            isSuccess,
            responseMessage
        } = this.state;
        return (
            <div>
                <PageHeader heading="Register"/>
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Resetting Password...</Loader>
                    </Dimmer>
                </Segment>

                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column style={{maxWidth: '450px'}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Reset your password
                        </Header>
                        {responseError.isError && <Message negative>
                            <Message.Content>
                                {responseError.text}
                            </Message.Content>
                        </Message>}
                        {isSuccess && <Message positive>
                            <Message.Content>
                                {responseMessage} <Link to='/login' replace>Login</Link> here
                            </Message.Content>
                        </Message>}
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='password'
                                    placeholder='New password'
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                {errors.has('password') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password')}
                                </Header>}
                                <Form.Input
                                    fluid
                                    icon='refresh'
                                    iconPosition='left'
                                    name='password_confirmation'
                                    placeholder='Confirm new password'
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                {errors.has('password_confirmation') &&
                                <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password_confirmation')}
                                </Header>}
                                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Change Password</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

Page.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default Page;
