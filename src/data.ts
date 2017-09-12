

export type TaskType = "minus" | "plus";
export enum TaskState{
    None,
    Ready,
    Done,
    Canceled
}

export enum Mode{
    Normal,
    RegisterWizardPlus,
    RegisterWizardMinus
}

export interface AppState{
    tasks: Task[];
    history: Task[];
    schedules: Schedule[];
    mode: Mode;
    tabIndex: number;
}

export interface Task{
    id: string;
    image: string;
    type: TaskType;
    kind: string;
    title: string;
    rank: number;
    state: TaskState;
    dueDate: Date;
    doneDate: Date;
}

export interface Schedule{
    template: Task;
    time: Scheduler;
}

export type Repeat = "now" | "once" | "everyday" | "week" | "twoWeek" | "month";

export interface Scheduler{
    repeat: Repeat;
    date: Date;
    days: number[];
}