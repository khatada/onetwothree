import * as React from "react";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';
moment.locale(navigator.language)

export class Register extends React.Component<any, any> {

    state = {
        startDate: moment(),
    }

    handleChange(){

    }

    render() {
        return <div className="fill">
            <div className="register-calender-container">
                <DatePicker inline={true} selected={this.state.startDate} onChange={this.handleChange.bind(this)}/>
            </div>
        </div>
    }
}