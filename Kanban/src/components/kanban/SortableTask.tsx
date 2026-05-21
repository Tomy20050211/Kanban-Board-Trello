import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

import type { TasksProps } from "../../types/task.interface";
import { CardTask } from "../ui/CardTask";

type Props = {
  task: TasksProps;
  dragOverlay?: boolean;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, next: { title: string; description: string }) => void;
};

export function SortableTask({ task, dragOverlay, onDeleteTask, onUpdateTask }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "task", status: task.status },
    disabled: Boolean(dragOverlay) || isEditing,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`kanban-task status-${task.status} ${isDragging ? "is-dragging" : ""}`}
      data-status={task.status}
      {...attributes}
      {...listeners}
    >
      <CardTask
        task={task}
        isEditing={isEditing}
        onEditStart={() => setIsEditing(true)}
        onEditCancel={() => setIsEditing(false)}
        onSave={next => {
          onUpdateTask(task.id, next);
          setIsEditing(false);
        }}
        onDelete={() => {
          if (!confirm("¿Eliminar esta tarea?")) return;
          onDeleteTask(task.id);
        }}
      />
    </div>
  );
}
