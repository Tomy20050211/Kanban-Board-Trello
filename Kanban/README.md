# Kanban (React + TypeScript + Vite)

Aplicación tipo **Kanban** para gestionar tareas por estado (Pendiente → En progreso → Hecho) con **drag & drop**, validación y persistencia local en el navegador.

## Qué incluye

- Columnas configuradas en el proyecto: **Pendiente**, **En progreso**, **Hecho**.
- Crear tareas con **título** y **descripción**.
- Editar y eliminar tareas.
- Mover tareas entre columnas con **@dnd-kit**.
- Persistencia en **localStorage** (`kanban.tasks`).

## Tecnologías

- React 19
- TypeScript
- Vite
- @dnd-kit (drag & drop)

## Instalación y ejecución

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: desarrollo
- `npm run build`: build
- `npm run lint`: lint
- `npm run preview`: preview del build

