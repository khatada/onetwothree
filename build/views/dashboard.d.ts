/// <reference types="react" />
import * as React from "react";
import { AppState } from "../data";
export interface DashboardPageProps extends AppState {
}
export declare class DashboardPage extends React.Component<DashboardPageProps, {}> {
    state: {
        dialogShown: boolean;
    };
    randomData(max: number, length: number): number[];
    hideDialog(): void;
    showDialog(): void;
    render(): JSX.Element;
}
