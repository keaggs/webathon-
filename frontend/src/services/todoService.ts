import api from '../lib/axios'

export interface TodoItem {
  id?: number
  name: string
}

export interface Todo {
  id: number
  title: string
  items: TodoItem[]
  createdAt?: string
  updatedAt?: string
}

export interface CreateTodoData {
  title: string
  items: string[]
}

export interface UpdateTodoData {
  title?: string
  items?: string[]
}

export const todoService = {
  getTodos: () => api.get<Todo[]>('/todos'),
  getTodoById: (id: number) => api.get<Todo>(`/todos/${id}`),
  createTodo: (data: CreateTodoData) => api.post<Todo>('/todos', data),
  updateTodo: (id: number, data: UpdateTodoData) => api.put<Todo>(`/todos/${id}`, data),
  deleteTodo: (id: number) => api.delete(`/todos/${id}`),
}
