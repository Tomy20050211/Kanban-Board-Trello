import type { StatusProps } from "../../types/state.type";

export type ColumnDef = { id: StatusProps; title: string };

export const KANBAN_STATUSES: StatusProps[] = ["pending", "in-progress", "done"];

export const KANBAN_COLUMNS: ColumnDef[] = [
  { id: "pending", title: "Pendiente" },
  { id: "in-progress", title: "En progreso" },
  { id: "done", title: "Hecho" },
];

