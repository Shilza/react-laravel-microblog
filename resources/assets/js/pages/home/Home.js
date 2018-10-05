import React from 'react'
import PrivatePage from "./private/PrivatePage";
import {PublicPage} from "./public/PublicPage";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
    }
};

export const Home = connect(mapStateToProps)((props) => {
    return (
        <div>
            {props.isAuthenticated ?
                <PrivatePage/> : <PublicPage/>
            }
        </div>
    );
});