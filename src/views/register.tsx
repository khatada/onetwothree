import * as React from "react";
import {Page, Toolbar, Row, Col} from "react-onsenui";

import {Mode} from "../data";

export interface RegisterPageProps{
    onRequestChangeMode: (mode: Mode)=>void;
}

export class RegisterPage extends React.Component<RegisterPageProps, any> {

    state = {
    }

    onStartWizardPlusClick(){
        this.props.onRequestChangeMode(Mode.RegisterWizardPlus);
    }

    onStartWizardMinusClick(){
        this.props.onRequestChangeMode(Mode.RegisterWizardMinus);
    }

    render() {
        return <Page renderToolbar={() => {
            return <Toolbar>
                <div className="center">タスクを登録</div>
            </Toolbar>
        }}>
            <div className="vertical-center register-top-button-container">
                <Row>
                    <Col>
                        <button className="register-top-button register-top-button-plus"
                            onClick={this.onStartWizardPlusClick.bind(this)}>
                            足し算
                        </button>
                    </Col>
                    <Col>
                        <button className="register-top-button register-top-button-minus" 
                            onClick={this.onStartWizardMinusClick.bind(this)}>
                            引き算
                        </button>
                    </Col>
                </Row>
            </div>
        </Page>
    }
}