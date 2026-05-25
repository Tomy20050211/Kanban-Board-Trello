# Kanban-Board-Trello

Aplicación tipo **Kanban** para gestionar tareas por estado (estilo Trello), con **drag & drop**, validación de campos y persistencia local en el navegador.

## Características

- 3 columnas:
  - **Pendiente**
  - **En progreso**
  - **Hecho**
- Crear una tarea con **título** y **descripción**.
- Editar el contenido de una tarea.
- Eliminar tareas.
- Mover tareas entre columnas con **arrastrar y soltar** (drag & drop).
- Persistencia en **localStorage** (`kanban.tasks`).

## Stack

- **React 19**
- **TypeScript**
- **Vite**
- **@dnd-kit** (drag & drop)

## Cómo ejecutar

> Desde la carpeta del proyecto `Kanban/`.

```bash
cd Kanban
npm install
npm run dev
```

Abre la URL que te muestre Vite (normalmente `http://localhost:5173`).

## Scripts útiles

```bash
npm run dev      # desarrollo
npm run build    # build
npm run lint     # lint
npm run preview  # preview del build
```

