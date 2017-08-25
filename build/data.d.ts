export declare type TaskType = "minus" | "plus";
export declare enum TaskState {
    None = 0,
    Ready = 1,
    Done = 2,
    Canceled = 3,
}
export declare enum Mode {
    Normal = 0,
    RegisterWizardPlus = 1,
    RegisterWizardMinus = 2,
}
export interface AppState {
    tasks: Task[];
    history: Task[];
    schedules: Schedule[];
    mode: Mode;
    tabIndex: number;
}
export interface Task {
    id: string;
    type: TaskType;
    kind: string;
    title: string;
    rank: number;
    state: TaskState;
    dueDate: Date;
    doneDate: Date;
}
export interface Schedule {
    template: Task;
    time: Scheduler;
}
export declare type Repeat = "now" | "once" | "everyday" | "week" | "twoWeek" | "month";
export interface Scheduler {
    repeat: Repeat;
    date: Date;
    days: number[];
}
