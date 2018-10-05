import React, {Fragment} from 'react'
import {MobileHeader} from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

export const ResponsiveContainer = (props) => (
    <Fragment>
        <DesktopHeader {...props}/>
        <MobileHeader {...props}/>
    </Fragment>
);