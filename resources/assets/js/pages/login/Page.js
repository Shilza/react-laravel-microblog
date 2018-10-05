import React from 'react'
import {
    Button,
    Dimmer,
    Form,
    Grid,
    Header,
    Loader,
    Message,
    Segment} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import PageHeader from '../../common/pageHeader'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6'
        });

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isLoading: false,
            errors: this.validator.errors
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
        this.props.login(credentials)
            .then(() => {
                this.props.feed();
                this.props.getRecommendedUsers();
            })
            .catch(({response, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: response.data.message
                };
                this.setState({
                    isLoading: false,
                    responseError
                });
            })

    }

    componentDidMount(){
        this.setState({
            isLoading: false
        });
    }

    render() {
        const {from} = this.props.location.state || { from: { pathname: '/' } };
        const {isAuthenticated} = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to={from}/>
            )
        }
        const {
            errors,
            responseError
        } = this.state;

        return (
            <div>
                <PageHeader heading="Login"/>
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Authenticating...</Loader>
                    </Dimmer>
                </Segment>

                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column style={{maxWidth: '450px'}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Login to your account
                        </Header>
                        {responseError.isError && <Message negative>
                            <Message.Content>
                                {responseError.text}
                            </Message.Content>
                        </Message>}
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    name='email'
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                    error={errors.has('email')}
                                />
                                {errors.has('email') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('email')}
                                </Header>}
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleChange}
                                    error={errors.has('password')}
                                />
                                {errors.has('password') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password')}
                                </Header>}
                                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Login</Button>
                                <Link to='/forgot-password' replace>Forgot your password?</Link>
                            </Segment>
                        </Form>
                        <Message>
                            New to us?
                            <Link to='/register' replace> Register</Link>
                        </Message>
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
