import { useMemo, useState } from "react"
import type { Task } from "../types"

interface TaskListProps {
    tasks: Task[],
    setEditingTask: React.Dispatch<React.SetStateAction<Task | undefined>>,
    handleDelete: (id: string) => void,
    handleCompleteTask: (id: string) => void
}

export const TaskList = ({
    tasks, 
    setEditingTask, 
    handleDelete,
    handleCompleteTask
}: TaskListProps) => {

  const [filter, setFilter] = useState<'pending' | 'done'>()
  let filteredTasks: Task[] = useMemo(() => {
    if(!filter) return tasks

    return tasks.filter(t => t.estado == filter)
  }, [filter, tasks])

  return (
    <>
      <h2>Tasks</h2>

      <div className="task-status">
        <button onClick={() => {setFilter(undefined)}}>All</button>
        <button onClick={() => {setFilter('done')}}>Completed</button>
        <button onClick={() => {setFilter('pending')}}>Pending</button>
      </div>

      <ul className="list-task">
        {filteredTasks.map(item => (
          <li className="task" key={item.id}>

            <div className="task-info">
              <input 
                  type="checkbox" 
                  checked={item.estado === 'done'}
                  onChange={() => handleCompleteTask(item.id)}
                  />

              <p>{item.description}</p>
            </div>

            <div>
              <button onClick={() => setEditingTask(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}