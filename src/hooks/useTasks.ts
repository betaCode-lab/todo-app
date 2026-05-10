import { useEffect, useState } from "react"
import type { Task } from "../types"

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const data = localStorage.getItem('tasks')
        if(data) return JSON.parse(data) as Task[]
        return []
    })

    const [editingTask, setEditingTask] = useState<Task | undefined>()

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    function handleCreate(task: Task) {
    setTasks(prev => [...prev, task]);
    }

    function handleEdit(task:Task) {
        const updated = tasks.map(t => {
            if(t.id === task.id) {
                return {...t, description: task.description}
            }
            return t
        })

        setTasks(updated)
        setEditingTask(undefined)
    }

    function handleDelete(id: string) {
        const newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks);
    }
    
    function handleCompleteTask(id: string) {

        const updated:Task[] = tasks.map(t => {
            if(t.id === id) {
                return {
                    ...t,
                    estado: t.estado === 'done' ? 'pending' : 'done'
                }
            }

                return t
        })

        setTasks(updated)
    }

    return {
        tasks,
        editingTask,
        setEditingTask,
        handleCreate,
        handleEdit,
        handleDelete,
        handleCompleteTask
    }
}