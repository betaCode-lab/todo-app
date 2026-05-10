import { FormTask } from "./components/FormTask"
import { TaskList } from "./components/TaskList"
import { useTasks } from "./hooks/useTasks"

function App() {
  
  const {
    tasks,
    setEditingTask,
    editingTask,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCompleteTask
  } = useTasks()

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Task Board</h1>
        </div>
      </header>

      <main className="container">
        <FormTask key={editingTask?.id || 'new'}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          editingTask={editingTask}
        />

        

        <TaskList 
          tasks={tasks}
          setEditingTask={setEditingTask}
          handleDelete={handleDelete}
          handleCompleteTask={handleCompleteTask}
        />        
      </main>

      <footer className="footer">
        <p>&copy; All rigths reserved</p>
      </footer>
    </>
  )
}

export default App
