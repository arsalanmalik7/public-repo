import ProgressBar from "./progressBar"
import Toggle from "./toggle"
import Button from "./button"
import { useEffect } from "react"

export default function ManageRestaurantPanel({ restaurant, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-[50%] bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-textcolor">Manage Restaurant</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-textcolor"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-textcolor mb-1 text-left">Restaurant Name</label>
            <input
              type="text"
              defaultValue="The Italian Place"
              className="w-full bg-background p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textcolor mb-1 text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Address
            </label>
            <input
              type="text"
              defaultValue="123 Main Street, New York, NY 10001"
              className="w-full p-2 bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textcolor mb-1 text-left">Cuisine Type</label>
          <div className="relative">
            <select className="w-full p-2 bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none">
              <option>Italian</option>
              <option>French</option>
              <option>Japanese</option>
              <option>Mexican</option>
              <option>American</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2.5 bg-background rounded-xl">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Owner</label>
            <p className="text-sm">Michael Romano</p>
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Franchise Status</label>
            <p className="p-1 bg-textcolor rounded-xl text-white" style={{ fontSize: '13px' }}>Independent Restaurant</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textcolor mb-1 text-left">Managers Assigned</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-[300px]">
              <div className="flex items-center p-2.5 bg-background rounded-xl w-full">
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex-shrink-0"></div>
                <p className="text-sm">Sarah Johnson</p>
              </div>
              <div className="flex items-center p-2.5 bg-background rounded-xl w-full mt-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex-shrink-0"></div>
                <p className="text-sm">David Chen</p>
              </div>
              <div className="flex items-center p-2.5 bg-background rounded-xl w-full mt-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex-shrink-0"></div>
                <p className="text-sm">David Chen</p>
              </div>
                 <button className="text-sm mt-2 flex text-left text-textcolor">View Full List</button>
            </div>


            <div className=" gap-4 ">
              <div className="p-2.5 bg-background rounded-xl w-full">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Restaurant Status</label>
                  <Toggle defaultChecked={true} />
                </div>
                <p className="text-xs text-gray-500 text-left">Restaurant is Active</p>
              </div>

              <div className="p-2.5 bg-background rounded-xl w-full mt-10">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Allow Menu Customization</label>
                  <Toggle defaultChecked={true} />
                </div>
                <p className="text-xs text-gray-500 text-left">Restaurant can modify franchise menu items</p>
              </div>
        <button className="text-sm mt-2 flex text-left text-textcolor">View Full List</button>

            </div>
          </div>
  


        </div>



        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-textcolor mb-1 text-left">Staff Overview</label>
            <button className="text-sm text-textcolor text-left">View Full List</button>
          </div>
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-gray-400 border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                +20
              </div>
            </div>

          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textcolor mb-1 text-left">Training Progress</label>
          <div className="p-2.5 bg-background rounded-xl">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Completed Training</span>
              <span className="text-sm font-medium">22/24 Employees</span>
            </div>
            <ProgressBar variant="dark" showLabel={false} value={22} max={24} className="h-2 bg-gray-100" progressClassName="bg-primary" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textcolor mb-1 text-left">Recent Activity</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start p-2.5 bg-background rounded-xl w-full">
              <div className="h-8 w-8 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-textcolor"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Menu updated - 3 items added</p>
                <p className="text-xs text-gray-500">Jan 15, 2025 at 2:30 PM</p>
              </div>
            </div>
            <div className="flex items-start p-2.5 bg-background rounded-xl w-full">
              <div className="h-8 w-8 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-textcolor"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">New employee added - John Smith</p>
                <p className="text-xs text-gray-500">Jan 14, 2025 at 11:15 AM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button className="flex-1  hover:bg-gray-800">Save Changes</Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}