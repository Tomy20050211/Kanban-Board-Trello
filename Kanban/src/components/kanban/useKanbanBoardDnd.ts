import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

import type { TasksProps } from "../../types/task.interface";
import { applyDragEnd, getStatusForDragId, groupTasksByStatus } from "./kanban.utils";

type Args = {
  tasks: TasksProps[];
  setTasks: Dispatch<SetStateAction<TasksProps[]>>;
};

export function useKanbanBoardDnd({ tasks, setTasks }: Args) {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const tasksByStatus = useMemo(() => groupTasksByStatus(tasks), [tasks]);

  const activeTask = useMemo(() => {
    if (!activeTaskId) return null;
    return tasks.find(t => t.id === activeTaskId) ?? null;
  }, [activeTaskId, tasks]);

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(String(active.id));
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTaskId(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const fromStatus = getStatusForDragId(tasks, activeId);
    const toStatus = getStatusForDragId(tasks, overId);
    if (!fromStatus || !toStatus) return;

    setTasks(prev =>
      applyDragEnd({ prev, activeId, overId, fromStatus, toStatus }),
    );
  };

  return { sensors, tasksByStatus, activeTask, onDragStart, onDragEnd };
}

