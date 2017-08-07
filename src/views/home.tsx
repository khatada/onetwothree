import * as React from "react";
import {AppBar} from "material-ui";

import {TaskView} from "./components/task";
import {Task, AppState} from "../data";

export class Home extends React.Component<AppState, any> {
    render() {
        return <div className="fill">
            <AppBar title="ミッション" showMenuIconButton={false}/>
            <div className="task-list">
                {this.props.todayTasks.map((task)=>{
                    return <TaskView task={task}/>
                })}
            </div>
        </div>
    }
}