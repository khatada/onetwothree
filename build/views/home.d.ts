/// <reference types="react" />
import * as React from "react";
import { Task, AppState } from "../data";
export interface HomePageProps extends AppState {
    onRequestDoneTask: (task: Task) => void;
}
export declare class HomePage extends React.Component<HomePageProps, {}> {
    state: {
        pullHookState: string;
        segment: number;
    };
    handlePullHookChange(e: any): void;
    onTaskClick(task: Task): void;
    onChageSegment(id: any, e: any): void;
    renderPullHookContent(): "Pull to refresh" | "Release" | "Loading...";
    renderRow(row: Task, index: number): JSX.Element;
    render(): JSX.Element;
}
