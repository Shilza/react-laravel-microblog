import React from "react";
import {Dropdown} from "semantic-ui-react";
import PropTypes from "prop-types";

export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.text = this.text.bind(this);
    }

    text(){
        const {
            name,
            type,
            created_at,
            followerName,
            post_id,
            comment_id
        } = this.props;

        const date = new Date(created_at * 1000);
        const time = date.getFullYear() + ' ' +
            monthNames[date.getMonth()] + ' ' +
            date.getDay() + ' ' +
            date.getHours() + ':' +
            date.getMinutes();

        let text = name;
        switch(type){
            case 'comment':
                text += ' commented your post';
                break;
            case 'comment_like':
                text += ' liked your comment';
                break;
            case 'post_like':
                text += ' liked your post ';
                break;
            case 'reply':
                text += ' replied to your comment ';
                break;
            case 'follow':
                text+= ' ' + followerName + ' followed you';
                break;
        }
        text += ' at ' + time;
        return text;
    }

    render() {
        return (
            <Dropdown.Item
                image={this.props.avatar}
                text={this.text()}
            />
        );
    }
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Notification.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    followerName: PropTypes.string,
    post_id: PropTypes.string,
    comment_id: PropTypes.string,
};
