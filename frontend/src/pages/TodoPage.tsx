import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { todoService, type Todo } from '../services/todoService'

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTodos()
    console.log('loaded')
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await todoService.getTodos();
      if (res.data) {
        setTodos(res.data)
        return
      }
    } catch (error) {
      setError('Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const res = await todoService.deleteTodo(id);
      if (res.status == 200) {
        alert("Todo deleted successfully");
        fetchTodos()
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="text-gray-600">Loading todos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Todo Lists</h1>
        <Link
          to="/todos/new"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm font-medium"
        >
          Create Todo
        </Link>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No todos yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className='flex flex-col'>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">{todo.title}</h2>

                {todo.items && todo.items.length > 0 && (
                  <ul className="mb-4 space-y-2 max-h-40 overflow-y-auto pr-2">
                    {todo.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>


              <div className='flex flex-col'>
                <p className="text-xs text-gray-500 mb-4">
                  {new Date(todo.createdAt || '').toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <Link
                    to={`/todos/${todo.id}/edit`}
                    className="flex-1 px-3 py-1.5 text-center cursor-pointer text-sm font-medium rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-1 px-3 py-1.5 text-sm font-medium rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
