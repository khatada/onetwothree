import * as React from "react";

import {Task} from "../../data";

export interface TaskViewProps{
    task: Task;
}
export class TaskView extends React.Component<TaskViewProps, {}> {

    style:{[key: string]: React.CSSProperties} = {
        title: {
            fontSize: 22
        },
        container: {
            margin: 5
        }
    }

    render() {
        // const rank = <Avatar size={50}>{this.props.task.rank}</Avatar>
        // return <Paper zDepth={1} style={this.style.container}>
        //     <Card>
        //         <CardHeader title={this.props.task.title} avatar={rank} titleStyle={this.style.title}/>
        //     </Card>
        // </Paper>
        return <div/>
    }
}