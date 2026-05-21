import { useEffect, useState } from "react";

import type { TasksProps } from "../../types/task.interface";
import { TASK_RULES, validateTask } from "../../hooks/useTaskValidation";
import { ControllerInput } from "./ControllerInput";

type Props = {
  task: TasksProps;
  isEditing: boolean;
  onEditStart: () => void;
  onEditCancel: () => void;
  onSave: (next: { title: string; description: string }) => void;
  onDelete: () => void;
};

export function CardTask({
  task,
  isEditing,
  onEditStart,
  onEditCancel,
  onSave,
  onDelete,
}: Props) {
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDescription, setDraftDescription] = useState(task.description);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>(
    {}
  );

  useEffect(() => {
    if (!isEditing) return;
    setDraftTitle(task.title);
    setDraftDescription(task.description);
    setErrors({});
  }, [isEditing, task.description, task.title]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validateTask(draftTitle, draftDescription);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSave({ title: draftTitle, description: draftDescription });
  }

  if (isEditing) {
    return (
      <div className="task-card">
        <form
          className="task-edit"
          onSubmit={handleSave}
          noValidate
          onPointerDown={e => e.stopPropagation()}
        >
          <ControllerInput
            name={`edit-title-${task.id}`}
            label="Título"
            value={draftTitle}
            required
            minLength={TASK_RULES.title.min}
            maxLength={TASK_RULES.title.max}
            error={errors.title}
            onChange={setDraftTitle}
          />

          <ControllerInput
            name={`edit-description-${task.id}`}
            label="Descripción"
            as="textarea"
            value={draftDescription}
            required
            minLength={TASK_RULES.description.min}
            maxLength={TASK_RULES.description.max}
            error={errors.description}
            onChange={setDraftDescription}
          />

          <div className="task-actions">
            <button
              className="btn btn-ghost"
              type="button"
              onClick={onEditCancel}
              onPointerDown={e => e.stopPropagation()}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onPointerDown={e => e.stopPropagation()}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-card-top">
        <h3 className="task-card-title">{task.title}</h3>
        <div className="task-card-actions">
          <button
            className="icon-btn"
            type="button"
            onClick={onEditStart}
            onPointerDown={e => e.stopPropagation()}
            aria-label="Editar"
          >
            Editar
          </button>
          <button
            className="icon-btn danger"
            type="button"
            onClick={onDelete}
            onPointerDown={e => e.stopPropagation()}
            aria-label="Eliminar"
          >
            Eliminar
          </button>
        </div>
      </div>

      <p className="task-card-desc">{task.description}</p>
    </div>
  );
}
