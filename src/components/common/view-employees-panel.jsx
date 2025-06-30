import ProgressBar from "./progressBar"
import { useEffect } from "react"

export default function ViewEmployeesPanel({ restaurant, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-[50%] bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
  <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
    <h2 className="text-lg font-semibold">View Employees</h2>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <div className="p-4 sm:p-6">
    {/* Total Employees Section */}
    <div className="mb-6 bg-background p-4 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">
          Total Employees
          <span className="block text-2xl font-bold">24</span>
        </h3>
        <div className="p-1 rounded-md bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-textcolor"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
    </div>

    {/* Active vs. Inactive Section */}
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Active vs. Inactive (Last 7 Days)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-background p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div className="h-6 w-6 rounded-full bg-textcolor flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-background p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">6</p>
              <p className="text-xs text-gray-500">Inactive</p>
            </div>
            <div className="h-6 w-6 rounded-full bg-textcolor flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Training Progress Section */}
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Training Progress</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex justify-between p-4 bg-background rounded-xl">
          <span className="text-md">Completed Training</span>
          <span className="text-sm font-medium">15</span>
        </div>
        <div className="flex justify-between p-4 bg-background rounded-xl">
          <span className="text-md">In Progress</span>
          <span className="text-sm font-medium">6</span>
        </div>
        <div className="flex justify-between p-4 bg-background rounded-xl">
          <span className="text-md">Not Started</span>
          <span className="text-sm font-medium">3</span>
        </div>
      </div>
    </div>

    {/* Most Active Employees Section */}
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Most Active Employees (Last 30 Days)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center p-4 bg-background rounded-xl">
          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
          <div className="flex-1">
            <p className="text-md font-medium">Sarah Johnson</p>
            <p className="text-xs text-gray-500">45 lessons</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-background rounded-xl">
          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
          <div className="flex-1">
            <p className="text-md font-medium">Mike Chen</p>
            <p className="text-xs text-gray-500">38 lessons</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-background rounded-xl">
          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
          <div className="flex-1">
            <p className="text-md font-medium">Lisa Park</p>
            <p className="text-xs text-gray-500">32 lessons</p>
          </div>
        </div>
      </div>
    </div>
 

    <div className="mb-6">
  <h3 className="text-sm font-medium mb-2 text-left">Overdue Training</h3>
  <div className="flex flex-wrap justify-between gap-4">
    <div className="flex items-center p-2.5 bg-background rounded-xl w-full sm:w-[48%]">
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex-1 text-left">
        <p className="text-md font-medium">John Smith</p>
      </div>
      <div className="text-left">
        <p className="text-sm text-textcolor">5 days</p>
      </div>
    </div>
    <div className="flex items-center p-2.5 bg-background rounded-xl w-full sm:w-[48%]">
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex-1 text-left">
        <p className="text-md font-medium">Emma Wilson</p>
      </div>
      <div className="text-left">
        <p className="text-sm text-textcolor">3 days</p>
      </div>
    </div>
  </div>
</div>

<div>
  <h3 className="text-sm font-medium text-left">Completion Rate by Role</h3>
  <div className="flex flex-wrap justify-between gap-4">
    <div className="w-full sm:w-[48%]">
      <div className="flex justify-between mb-1">
        <span className="text-sm">Managers</span>
        <span className="text-sm font-medium">95%</span>
      </div>
      <ProgressBar
        variant="dark"
        value={95}
        max={100}
        showLabel={false}
        className="h-2 bg-gray-100"
        progressClassName="bg-primary"
      />
    </div>
    <div className="w-full sm:w-[48%]">
      <div className="flex justify-between">
        <span className="text-sm">Employees</span>
        <span className="text-sm font-medium">82%</span>
      </div>
      <ProgressBar
        variant="dark"
        value={82}
        max={100}
        showLabel={false}
        className="h-2 bg-gray-100"
        progressClassName="bg-primary"
      />
    </div>
  </div>
</div>
      </div>
    </div>
  )
}