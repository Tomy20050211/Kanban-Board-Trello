import {
  DndContext,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import { type Dispatch, type SetStateAction } from "react";

import type { TasksProps } from "../../types/task.interface";
import { KanbanColumn } from "./KanbanColumn";
import { SortableTask } from "./SortableTask";
import { KANBAN_COLUMNS } from "./kanban.config";
import { useKanbanBoardDnd } from "./useKanbanBoardDnd";

type Props = {
  tasks: TasksProps[];
  setTasks: Dispatch<SetStateAction<TasksProps[]>>;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, next: { title: string; description: string }) => void;
};

export function KanbanBoard({ tasks, setTasks, onDeleteTask, onUpdateTask }: Props) {
  const { sensors, tasksByStatus, activeTask, onDragStart, onDragEnd } =
    useKanbanBoardDnd({ tasks, setTasks });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="kanban-board">
        {KANBAN_COLUMNS.map(col => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={tasksByStatus[col.id]}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="kanban-overlay">
            <SortableTask
              task={activeTask}
              dragOverlay
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
