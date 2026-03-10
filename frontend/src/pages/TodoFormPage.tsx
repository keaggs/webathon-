import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { todoService } from '../services/todoService'

export default function TodoFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [title, setTitle] = useState('')
  const [items, setItems] = useState<string[]>([''])
  const [errors, setErrors] = useState<{ title?: string }>({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit && id) {
      todoService
        .getTodoById(Number(id))
        .then((res) => {
          setTitle(res.data.title)
          setItems(res.data.items.map((item) => item.name))
        })
        .catch(() => setSubmitError('Failed to load todo'))
    }
  }, [isEdit, id])

  function validate(): boolean {
    const next: { title?: string } = {}
    if (!title.trim()) next.title = 'Title is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleItemChange(index: number, value: string) {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  function addItem() {
    setItems([...items, ''])
  }

  function removeItem(index: number) {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems.length > 0 ? newItems : [''])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return

    setLoading(true)
    const filteredItems = items.filter((item) => item.trim() !== '')

    if (isEdit && id) {
      todoService
        .updateTodo(Number(id), {
          title: title.trim(),
          items: filteredItems,
        })
        .then(() => navigate('/todo'))
        .catch((err) =>
          setSubmitError(err.response?.data?.message || 'Failed to update todo')
        )
        .finally(() => setLoading(false))
    } else {
      todoService
        .createTodo({ title: title.trim(), items: filteredItems })
        .then(() => navigate('/todo'))
        .catch((err) =>
          setSubmitError(err.response?.data?.message || 'Failed to create todo')
        )
        .finally(() => setLoading(false))
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        {isEdit ? 'Edit Todo' : 'Create Todo'}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
        {submitError && (
          <div className="p-3 rounded bg-red-50 text-red-700 text-sm">
            {submitError}
          </div>
        )}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo list title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-gray-200 focus:border-gray-400"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Items
          </label>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder={`Item ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-gray-200 focus:border-gray-400"
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition text-sm font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addItem}
            className="mt-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-sm font-medium"
          >
            Add Item
          </button>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 transition font-medium"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Todo' : 'Create Todo'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/todo')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
