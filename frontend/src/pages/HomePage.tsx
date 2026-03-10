import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userService, type User } from '../services/userService'

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await userService.getUsers();
      if (res.data) {
        setUsers(res.data)
        return
      }
    } catch (error) {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: number) => {
    try {
      const res = await userService.deleteUser(id);
      if (res.status == 200) {
        alert("User deleted successfully");
        fetchUsers()
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-gray-600">Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <Link
          to="/users/new"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm font-medium"
        >
          Add User
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-right flex w-full justify-end gap-2">
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="px-3 py-1.5 cursor-pointer text-sm font-medium rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition inline-block"
                  >
                    View
                  </Link>
                  <p onClick={() => deleteUser(user.id)} className="px-3 py-1.5 cursor-pointer text-sm font-medium rounded bg-red-200 text-gray-800 hover:bg-gray-300 transition inline-block">
                    Delete
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
