import _ from 'lodash'
import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import {Redirect} from "react-router";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {search} from "../../services/Users/usersService";

class SearchUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: [],
            value: '',
            redirect: ''
        };

        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    resetComponent() {
        this.setState({isLoading: false, results: [], value: ''});
    }

    handleResultSelect(e, {result}) {
        this.setState({value: result.title, redirect: '/' + result.title});
    }

    handleSearchChange(e, {value}) {
        this.setState({isLoading: true, value});

        setTimeout(() => {
            this.props.search(value);
            if (this.state.value.length < 1) return this.resetComponent();

            this.setState({
                isLoading: false,
                results: this.props.searchResults
            });
        }, 300)
    };

    render() {
        const {value, results, redirect} = this.state;

        return (
            redirect ?
                <Redirect to={redirect}/> :
                <Search
                    size={'mini'}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                    results={results}
                    value={value}
                />
        )
    }
}

SearchUsers.propTypes = {
    search: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        searchResults: state.User.searchResults
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        search:  search
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);