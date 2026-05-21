import "./App.css";
import "./kanban.css";

import { useCreateTask } from "./hooks/useCreateTask";
import { KanbanBoard } from "./components/kanban/KanbanBoard";
import { TaskForm } from "./components/ui/TaskForm";

function App() {
  const { task, setTask, addTask, deleteTask, updateTask } = useCreateTask();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Kanban</h1>
        <p className="app-subtitle">
          Crea una tarea y luego arrástrala entre columnas.
        </p>
      </header>

      <TaskForm onCreateTask={addTask} />

      {task.length ? (
        <KanbanBoard
          tasks={task}
          setTasks={setTask}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
      ) : (
        <section className="empty-state">
          <p className="empty-state-text">Aún no hay tareas.</p>
        </section>
      )}
    </div>
  );
}

export default App;
