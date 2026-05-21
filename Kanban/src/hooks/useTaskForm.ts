import { useState } from "react"
import { validateTask, type TaskValidationErrors } from "./useTaskValidation"

export function useTaskForm(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState<TaskValidationErrors>({})
    const [touched, setTouched] = useState<{ title: boolean; description: boolean }>({
        title: false,
        description: false,
    })

    function markTouched(field: "title" | "description"){
        setTouched(prev => ({ ...prev, [field]: true }))
    }

    function validateAll(){
        const nextErrors = validateTask(title, description)
        setErrors(nextErrors)
        setTouched({ title: true, description: true })
        return Object.keys(nextErrors).length === 0
    }

    const isValid = Object.keys(validateTask(title, description)).length === 0


    function resetForm(){
        setTitle("")
        setDescription("")
        setErrors({})
        setTouched({ title: false, description: false })
    }

    return {
        title,
        description,
        errors,
        touched,
        isValid,
        resetForm,
        setDescription,
        setTitle,
        markTouched,
        validateAll,
        setErrors,
    }
}
