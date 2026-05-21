import { useState } from "react"


export function useTaskForm(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")



    function resetForm(){
        setTitle("")
        setDescription("")
    }

    return { title, description, resetForm, setDescription, setTitle}
}