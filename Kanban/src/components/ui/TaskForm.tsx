import { ControllerInput } from "./ControllerInput";

import { useTaskForm } from "../../hooks/useTaskForm";
import { TASK_RULES } from "../../hooks/useTaskValidation";

type Props = {
  onCreateTask: (title: string, description: string) => void;
};

export function TaskForm({ onCreateTask }: Props) {
  const {
    title,
    description,
    setDescription,
    setTitle,
    resetForm,
    errors,
    touched,
    validateAll,
  } = useTaskForm();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateAll()) return;

    onCreateTask(title, description);
    resetForm();
  }

  return (
    <section className="panel">
      <h2 className="panel-title">Nueva tarea</h2>

      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <ControllerInput
          name="title"
          label="Título"
          value={title}
          placeholder="Ej: Llamar al cliente"
          required
          minLength={TASK_RULES.title.min}
          maxLength={TASK_RULES.title.max}
          error={touched.title ? errors.title : undefined}
          onChange={setTitle}
        />

        <ControllerInput
          name="description"
          label="Descripción"
          as="textarea"
          value={description}
          placeholder="¿Qué hay que hacer?"
          required
          minLength={TASK_RULES.description.min}
          maxLength={TASK_RULES.description.max}
          error={touched.description ? errors.description : undefined}
          onChange={setDescription}
        />

        <div className="task-form-actions">
          <button className="btn btn-primary" type="submit">
            Agregar tarea
          </button>
        </div>
      </form>
    </section>
  );
}

