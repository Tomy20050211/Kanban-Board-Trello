import { ControllerInput } from './components/ui/ControllerInput'
import { CardTask } from './components/ui/CardTask'
import './App.css'

import { useCreateTask } from './hooks/useCreateTask'
import { useTaskForm } from './hooks/useTaskForm'

function App() {
  const { title , description, setDescription, setTitle, resetForm} = useTaskForm()
  const {task,addTask} = useCreateTask()
   
  function handleAddTask() {
    addTask(title, description)
    resetForm()
  }



   return (
    <>
    <ControllerInput value={title} placeholder='Escribe el titulo de la tarea' onChange={setTitle}/>
   <ControllerInput value={description} placeholder='Escribe la descripcion'  onChange={setDescription}/>

    <button onClick={handleAddTask}>Agregar</button>
{/* 
    <div>
       <h1>
        {title}
       </h1>
       <p>
        {description}
       </p>
    </div> */}

    <section>
       {task.map(item => (
  <CardTask
    key={item.id}
    title={item.title}
    description={item.description}
  />
))}
    </section>
    </>

  
    
   )
}

export default App
