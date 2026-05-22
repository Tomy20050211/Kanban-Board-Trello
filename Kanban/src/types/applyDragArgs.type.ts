import type { StatusProps } from "./state.type";
import type { TasksProps } from "./task.interface";

export type ApplyDragArgs = {
  prev: TasksProps[];
  activeId: string;
  overId: string;
  fromStatus: StatusProps;
  toStatus: StatusProps;
};