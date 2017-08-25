/// <reference types="react" />
import * as React from "react";
import { AppState } from "../data";
export interface DashboardPageProps extends AppState {
}
export declare class DashboardPage extends React.Component<DashboardPageProps, {}> {
    state: {};
    randomData(max: number, length: number): number[];
    render(): JSX.Element;
}
