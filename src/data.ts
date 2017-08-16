

export type TaskType = "minus" | "plus";
export enum TaskState{
    None,
    Ready,
    Done,
    Canceled
}

export interface AppState{
    tasks: Task[];
    doneTasks: Task[];
    schedules: Schedule[];
}

export interface Task{
    type: TaskType;
    kind: string;
    title: string;
    rank: number;
    state: TaskState;
    dueDate: Date;
    doneDate: Date;
}

export interface Schedule{
    type: TaskType;
    template: Task;
    repeat: ScheduleRepeater;
}

export interface ScheduleRepeater{

}