export type TaskValidationErrors = {
  title?: string;
  description?: string;
};

export const TASK_RULES = {
  title: { min: 3, max: 80 },
  description: { min: 5, max: 240 },
} as const;

export function validateTask(title: string, description: string): TaskValidationErrors {
  const errors: TaskValidationErrors = {};
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();

  if (!cleanTitle) errors.title = "El título es obligatorio.";
  else if (cleanTitle.length < TASK_RULES.title.min)
    errors.title = `El título debe tener al menos ${TASK_RULES.title.min} caracteres.`;
  else if (cleanTitle.length > TASK_RULES.title.max)
    errors.title = `El título no puede tener más de ${TASK_RULES.title.max} caracteres.`;

  if (!cleanDescription) errors.description = "La descripción es obligatoria.";
  else if (cleanDescription.length < TASK_RULES.description.min)
    errors.description = `La descripción debe tener al menos ${TASK_RULES.description.min} caracteres.`;
  else if (cleanDescription.length > TASK_RULES.description.max)
    errors.description = `La descripción no puede tener más de ${TASK_RULES.description.max} caracteres.`;

  return errors;
}

