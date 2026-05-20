import { useState } from "react";
import type { TasksProps } from "../types/task.interface";

export function useCreateTask(){
        const [task, setTask] = useState<TasksProps[]>([])

        function addTask (title: string, description: string){
        
            const newTask: TasksProps= {
                id: crypto.randomUUID(),
                title,
                description,
                status: "pending"

            }

            setTask(prev => [...prev, newTask])                

        }
        
     return {
        task,
        addTask
     }
}