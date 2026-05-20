import type { StatusProps } from "./state.type";

export interface TasksProps {
    id: string;
    title: string;
    description: string;
    status: StatusProps
};

