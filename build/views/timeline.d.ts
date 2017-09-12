/// <reference types="react" />
import * as React from "react";
export interface History {
    title: string;
    detail: string;
    image: string;
}
export declare class TimelinePage extends React.Component<any, any> {
    state: {
        history: History[];
    };
    render(): JSX.Element;
}
