import * as React from "react";
import {AppBar} from "material-ui";

export class Goal extends React.Component<any, any> {
    render() {
        return <div className="fill">
            <AppBar title="ご褒美" showMenuIconButton={false}/>
        </div>
    }
}