/// <reference types="react" />
import * as React from "react";
import { Mode } from "../data";
export interface RegisterPageProps {
    onRequestChangeMode: (mode: Mode) => void;
}
export declare class RegisterPage extends React.Component<RegisterPageProps, any> {
    state: {};
    onStartWizardPlusClick(): void;
    onStartWizardMinusClick(): void;
    render(): JSX.Element;
}
