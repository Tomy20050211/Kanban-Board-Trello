import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import type { StatusProps } from "../../types/state.type";
import type { TasksProps } from "../../types/task.interface";
import { SortableTask } from "./SortableTask";

type Props = {
  id: StatusProps;
  title: string;
  tasks: TasksProps[];
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, next: { title: string; description: string }) => void;
};

export function KanbanColumn({ id, title, tasks, onDeleteTask, onUpdateTask }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className={`kanban-column status-${id}`} data-status={id}>
      <div className="kanban-column-header">
        <h2 className="kanban-column-title">{title}</h2>
        <span className="kanban-column-count">{tasks.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`kanban-column-dropzone ${isOver ? "is-over" : ""}`}
      >
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <SortableTask
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
