import React, {Fragment} from "react";
import InputContainer from "./InputContainer";
import PostComment from "./PostComment";
import {Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

export class Comments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reply_to_id: undefined,
            reply_name: ''
        };

        this.setReply = this.setReply.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
    }

    setReply({reply_to_id, reply_name}) {
        this.setState({reply_to_id,reply_name});
    }

    onSubmitComment({text, reply_to_id}) {
        this.props.createComment({text, reply_to_id});
        this.setState({reply_to_id: undefined, reply_name: ''});
    }

    cancelReply(){
        this.setState({reply_to_id: undefined, reply_name: ''});
    }

    render() {
        const inputStyle = {
            marginLeft: '2%',
            marginRight: '1%',
            marginBottom: '2%',
            minWidth: '50%'
        };

        const {comments} = this.props;

        const {
            reply_to_id,
            reply_name
        } = this.state;

        return (
            <div style={{marginLeft: '10%', marginTop: '4%', marginBottom: '4%'}}>
                {
                    comments.map((item, i) =>
                        <PostComment
                            onReplyClick={this.setReply}
                            {...item}
                            key={i}
                        />
                    )
                }
                <InputContainer
                    onSubmit={this.onSubmitComment}
                    inputStyle={inputStyle}
                    placeholder="Your comment"
                    size='mini'
                    reply_to_id={reply_to_id}
                />
                {reply_name &&
                <Fragment>
                    Replied to
                    <Link to={'/' + reply_name}> {reply_name} </Link>
                    <Icon link name={'close'} onClick={this.cancelReply}/>
                </Fragment>
                }
            </div>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    createComment: PropTypes.func.isRequired
};

Comments.defaultProps = {
    comments: []
};