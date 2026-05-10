import { v4 as uuidv4 } from 'uuid'
import type { Task } from "../types"
import { useState, type ChangeEvent, type SubmitEvent } from 'react'

interface FormTaskProps {
    handleCreate: (task: Task) => void
    handleEdit: (task: Task) => void
    editingTask: Task | undefined
}

const emptyTask:Task = {
    id: uuidv4(),
    description: '',
    estado: "pending"
}

export const FormTask = ({ handleCreate, handleEdit, editingTask }: FormTaskProps) => {
    const [task, setTask] = useState<Task>(editingTask || emptyTask)

    const [error, setError] = useState('')

    const isEditing = editingTask ? true : false

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTask({
            ...task,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if(task.description === '') {
            setError('Description is required.')
            return
        }

        setError('')

        if(editingTask) {
            handleEdit(task)
        } else {
            handleCreate(task)
        }

        setTask({
            ...emptyTask,
            id: uuidv4()
        })
    }
    
    return (
        <section className='container'>
            <div className='task-form-container'>
                <h3>Create Task</h3>

                <form className='form-task' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="description">Description:</label>
                        <input type="text" 
                            id="description" 
                            placeholder="Description"
                            onChange={handleChange}
                            value={task.description}/>

                        {error && <p className='text-danger'>{error}</p>}
                    </div>

                    <button className='btn btn-primary'>
                        {isEditing ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
        </section>
        
    )
}