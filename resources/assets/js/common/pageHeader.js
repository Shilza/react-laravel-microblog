import React from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Segment
} from 'semantic-ui-react'

export const PageHeader = (props) => {
    return (
        <Segment inverted textAlign="center" vertical>
            <Header as="h1">{props.heading}</Header>
        </Segment>
    );
};

PageHeader.propTypes = {
    heading: PropTypes.string.isRequired
};

export default PageHeader;