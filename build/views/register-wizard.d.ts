/// <reference types="react" />
import * as React from "react";
import { Mode, TaskType, Task, Scheduler, Repeat } from "../data";
export interface RegisterWizardPageProps {
    onRequestChangeMode: (mode: Mode) => void;
    onRequestCreate: (task: Task, schedular: Scheduler) => void;
    type: TaskType;
}
export interface TaskKindPreset {
    label: string;
}
export interface TaskPreset {
    title: string;
    rate: number;
    detail: string;
}
export declare class RegisterWizardPage extends React.Component<RegisterWizardPageProps, any> {
    state: {
        index: number;
        newTask: Task;
        schedular: Scheduler;
        pullHookState: string;
        presets: TaskPreset[];
    };
    onBackClick(navigator: any): void;
    onDiscardClick(): void;
    onSelectKindClick(navigator: any, kind: TaskKindPreset): void;
    onSelectRepeatClick(repeat: Repeat): void;
    onSelectScheduleClick(navigator: any): void;
    onSelectRepeatDurationClick(repeat: Repeat): void;
    onTaskClick(navigator: any, task: Task): void;
    onConfirmClick(): void;
    handlePullHookChange(e: any): void;
    renderPullHookContent(): "Pull to refresh" | "Release" | "Loading...";
    renderToolbar(route: any, navigator: any): JSX.Element;
    renderRow(navigator: any, row: TaskPreset, index: number): JSX.Element;
    renderPage(route: any, navigator: any): JSX.Element;
    render(): JSX.Element;
}
