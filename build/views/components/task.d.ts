/// <reference types="react" />
import * as React from "react";
import { Task } from "../../data";
export interface TaskViewProps {
    task: Task;
}
export declare class TaskView extends React.Component<TaskViewProps, {}> {
    style: {
        [key: string]: React.CSSProperties;
    };
    render(): JSX.Element;
}
