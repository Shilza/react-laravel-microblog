import React from 'react'
import UserPostsComponent from "../home/private/UserPostsComponent";
import MainPage from "./MainPage";

const Page = props => {
    return (
        <MainPage userLink={props.match.params.user}>
            <UserPostsComponent/>
        </MainPage>
    );
};

export default Page;