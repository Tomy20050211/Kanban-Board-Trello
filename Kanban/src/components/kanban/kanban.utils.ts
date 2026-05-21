import { arrayMove } from "@dnd-kit/sortable";

import type { StatusProps } from "../../types/state.type";
import type { TasksProps } from "../../types/task.interface";
import { KANBAN_STATUSES } from "./kanban.config";

export function isStatusId(id: string): id is StatusProps {
  return (KANBAN_STATUSES as string[]).includes(id);
}

export function groupTasksByStatus(tasks: TasksProps[]) {
  const grouped: Record<StatusProps, TasksProps[]> = {
    pending: [],
    "in-progress": [],
    done: [],
  };

  for (const task of tasks) grouped[task.status].push(task);
  return grouped;
}

export function getStatusForDragId(tasks: TasksProps[], id: string): StatusProps | null {
  if (isStatusId(id)) return id;
  const t = tasks.find(task => task.id === id);
  return t?.status ?? null;
}

type ApplyDragArgs = {
  prev: TasksProps[];
  activeId: string;
  overId: string;
  fromStatus: StatusProps;
  toStatus: StatusProps;
};

export function applyDragEnd({
  prev,
  activeId,
  overId,
  fromStatus,
  toStatus,
}: ApplyDragArgs): TasksProps[] {
  const prevByStatus = groupTasksByStatus(prev);
  const activeTask = prev.find(t => t.id === activeId);
  if (!activeTask) return prev;

  const fromList = prevByStatus[fromStatus];
  const toList = prevByStatus[toStatus];

  const fromIndex = fromList.findIndex(t => t.id === activeId);
  if (fromIndex < 0) return prev;

  const isDroppingOnColumn = isStatusId(overId);

  if (fromStatus === toStatus) {
    if (isDroppingOnColumn) return prev;
    const toIndex = toList.findIndex(t => t.id === overId);
    if (toIndex < 0) return prev;

    prevByStatus[toStatus] = arrayMove(toList, fromIndex, toIndex);
  } else {
    const nextActive: TasksProps = { ...activeTask, status: toStatus };
    const nextFrom = fromList.filter(t => t.id !== activeId);

    let insertAt = toList.length;
    if (!isDroppingOnColumn) {
      const overIndex = toList.findIndex(t => t.id === overId);
      if (overIndex >= 0) insertAt = overIndex;
    }

    const nextTo = [
      ...toList.slice(0, insertAt),
      nextActive,
      ...toList.slice(insertAt),
    ];

    prevByStatus[fromStatus] = nextFrom;
    prevByStatus[toStatus] = nextTo;
  }

  return [
    ...prevByStatus.pending,
    ...prevByStatus["in-progress"],
    ...prevByStatus.done,
  ];
}

