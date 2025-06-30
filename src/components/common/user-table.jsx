export default function UserTable({ users, onEditUser }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getRestaurantNames = (restaurants) => {
    if (!restaurants || restaurants.length === 0) return "-";
    return restaurants.map(r => r.name).join(", ");
  };

  return (
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="bg-trbackground">
          <th className="w-10 px-4 py-3">
            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider ">
            User
          </th>
          <th className="px-4 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider ">
            Role & Permissions
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
            Restaurant
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider ">
            Status
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider ">
            Last Login
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider ">
            Training Progress
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider ">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.uuid} className="hover:bg-hover">
            <td className="px-4 py-4">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-gray-200 flex-shrink-0 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{`${user.first_name} ${user.last_name}` || "-"}</div>
                  <div className="text-sm text-gray-500">{user.email || "-"}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 text-center">
              <div className="text-sm font-medium text-gray-900">{(user.role === "super_admin" ? "Admin" : user.role) || "-"}</div>
              <div className="text-sm text-gray-500">{user.permissions || "-"}</div>
            </td>
            <td className="px-4 py-4 text-center">
              <div className="text-sm text-gray-900">{getRestaurantNames(user.assigned_restaurants)}</div>
            </td>
            <td className="px-4 py-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500">
              {user.last_login ? formatDate(user.last_login) : 'Never'}
            </td>
            <td className="px-4 py-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{
                    width: `${user.lesson_progress?.length > 0 
                      ? (user.lesson_progress.filter(l => l.completed).length / user.lesson_progress.length) * 100 
                      : 0}%`
                  }}
                ></div>
              </div>
            </td>
            <td className="px-4 py-4 text-right text-sm font-medium">
              <button
                onClick={() => onEditUser(user)}
                className="text-primary hover:text-primary-dark"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  
    <div className="px-4 py-3 flex flex-wrap items-center justify-between border-t border-gray-200">
      <div className="text-sm text-gray-700">Showing 1 to {users.length} of {users.length} entries</div>
      <div className="flex flex-wrap items-center space-x-2">
        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
          Previous
        </button>
        <button className="px-3 py-1 rounded-md text-sm bg-textcolor text-white">1</button>
        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700">Next</button>
      </div>
    </div>
  </div>
  )
}
