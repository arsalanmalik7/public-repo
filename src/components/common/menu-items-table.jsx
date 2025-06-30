import { useState } from "react"
import Button from "./button"
import { MenuService } from "../../services/MenuService"

// Update the table headers based on the active tab
export default function MenuItemsTable({ items, onEditItem, activeTab = "food" }) {
  const [selectedItems, setSelectedItems] = useState([])

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(items.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (e, itemId) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, itemId])
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    }
  }

  const handleDelete = async (item) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (activeTab === "food") {
          await MenuService.deleteDish(item.uuid);
        } else {
          await MenuService.deleteWine(item.uuid);
        }
        // Refresh the items list after deletion
        window.location.reload();
      } catch (err) {
        console.error('Failed to delete item:', err);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr className="bg-trbackground">
            <th className="w-10 px-4 py-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary"
                onChange={handleSelectAll}
                checked={selectedItems.length === items.length && items.length > 0}
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Image</th>
            {activeTab === "food" ? (
              <>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Dish Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Dietary Restrictions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Price
                </th>
              </>
            ) : (
              <>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Wine Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Producer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Style Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Vintage
                </th>
              </>
            )}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id || item._id} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  onChange={(e) => handleSelectItem(e, item.id || item._id)}
                  checked={selectedItems.includes(item.id || item._id)}
                />
              </td>
              <td className="px-4 py-4">
                <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden flex justify-center items-center">
                  {item.image_url ? <img 
                    src={`${process.env.REACT_APP_IMAGE_BASE_URL}${item.image_url}`}
                    alt={item.name || "Image"}
                    className="h-full w-full object-cover"
                  />
                  : <svg
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
                  </svg>}
                </div>
              </td>
              {activeTab === "food" ? (
                <>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900 text-left">{item.name || "-"}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-center">{item.typeDisplay || "-"}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-center">
                      {item.restaurantNameDisplay || "-"}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-center">{item.dietaryDisplay || "-"}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-center">{formatDate(item.updatedAt)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900 text-center">${item.price?.toFixed(2)}</div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900 text-left">{item.product_name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-left">{item.producerDisplay}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-left">{item.category}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-left">{item.restaurantname || "-"}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-left">{item.style?.name || '-'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 text-left">{item.vintageDisplay}</div>
                  </td>
                </>
              )}
              <td className="px-4 py-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={item.status} readOnly />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-textcolor"></div>
                </label>
              </td>
              <td className="px-4 py-4 text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button onClick={() => onEditItem(item)} className="text-gray-500 hover:text-gray-700">
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(item)} className="text-gray-500 hover:text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-textcolor"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white">
        <div className="px-4 py-3 flex flex-wrap items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Displaying 1-{items.length} of {items.length} items
          </div>
          <div className="flex flex-wrap items-center space-x-2">
            <Button variant="secondary" size="sm" disabled={true}>
              Previous
            </Button>
            <Button variant="primary" size="sm" className="bg-primary text-white">
              1
            </Button>
            <Button variant="secondary" size="sm" disabled={true}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
