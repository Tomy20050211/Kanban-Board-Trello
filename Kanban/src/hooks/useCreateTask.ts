import { useEffect, useState } from "react";
import type { TasksProps } from "../types/task.interface";
import type { StatusProps } from "../types/state.type";

export function useCreateTask(){
        const [task, setTask] = useState<TasksProps[]>(() => {
            try {
                const raw = localStorage.getItem("kanban.tasks")
                if (!raw) return []
                const parsed = JSON.parse(raw) as unknown
                return Array.isArray(parsed) ? (parsed as TasksProps[]) : []
            } catch {
                return []
            }
        })

        useEffect(() => {
            try {
                localStorage.setItem("kanban.tasks", JSON.stringify(task))
            } catch {
                // ignore storage failures (private mode, quota, etc.)
            }
        }, [task])

        function addTask (title: string, description: string){
            const cleanTitle = title.trim()
            const cleanDescription = description.trim()

            if (!cleanTitle) return
            if (!cleanDescription) return
        
            const newTask: TasksProps= {
                id: crypto.randomUUID(),
                title: cleanTitle,
                description: cleanDescription,
                status: "pending"

            }

            setTask(prev => [...prev, newTask])                

        }

        function setTaskStatus(taskId: string, status: StatusProps) {
            setTask(prev =>
                prev.map(t => (t.id === taskId ? { ...t, status } : t))
            )
        }

        function deleteTask(taskId: string) {
            setTask(prev => prev.filter(t => t.id !== taskId))
        }

        function updateTask(taskId: string, next: { title: string; description: string }) {
            const cleanTitle = next.title.trim()
            const cleanDescription = next.description.trim()
            if (!cleanTitle) return
            if (!cleanDescription) return

            setTask(prev =>
                prev.map(t =>
                    t.id === taskId
                        ? { ...t, title: cleanTitle, description: cleanDescription }
                        : t
                )
            )
        }
        
     return {
        task,
        setTask,
        addTask,
        setTaskStatus,
        deleteTask,
        updateTask,
     }
}
