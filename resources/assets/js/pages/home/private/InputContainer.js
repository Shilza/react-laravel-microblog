import React from "react";
import {Button, Form, Image, Input} from "semantic-ui-react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputData: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e, data) {
        this.setState({inputData: data.value});
    }

    onSubmit() {
        event.preventDefault();
        const {inputData} = this.state;
        const {
            onSubmit,
            reply_to_id
        } = this.props;

        if (inputData) {
            onSubmit({text: inputData, reply_to_id});
            this.setState({inputData: ''});
        }
    }

    render() {
        const buttonStyle = {
            backgroundColor: 'transparent',
            border: '1px solid gray'
        }, formStyle = {marginTop: '2%'};
        const {
            inputStyle,
            size,
            placeholder,
            customerAvatar
        } = this.props;

        return (
            <Form style={formStyle}>
                <Image src={customerAvatar} avatar/>

                <Input
                    value={this.state.inputData}
                    onChange={this.onInputChange}
                    placeholder={placeholder}
                    style={inputStyle}
                    size={size}
                />
                <Button
                    onClick={this.onSubmit}
                    style={buttonStyle}
                    size={size}
                    toggle
                >
                    Send
                </Button>
            </Form>
        );
    }
}

InputContainer.propTypes = {
    size: PropTypes.string,
    inputStyle: PropTypes.object
};

InputContainer.defaultProps = {
    size: 'medium',
    placeholder: 'What\'s new'
};

const mapStateToProps = state => {
    return {
        customerAvatar: state.Auth.user.avatar,
    }
};

export default connect(mapStateToProps)(InputContainer);

