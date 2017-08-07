
export interface AppState{
    todayTasks: Task[];
}

export interface Task{
    title: string;
    rank: number;
}