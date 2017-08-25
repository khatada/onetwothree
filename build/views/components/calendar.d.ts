/// <reference types="react" />
import * as React from "react";
import * as moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';
export declare class Calendar extends React.Component<any, any> {
    state: {
        startDate: moment.Moment;
    };
    handleChange(): void;
    render(): JSX.Element;
}
