import React from 'react'
import Header from './common/header'

export const Main = (props) => {
    return (
        <div>
            <Header/>
            <main className="fadeIn animated">
                {props.children}
            </main>
        </div>
    );
};
