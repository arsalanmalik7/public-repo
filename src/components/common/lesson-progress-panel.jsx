import ProgressBar from "./progressBar"
import { useEffect } from "react"

export default function LessonProgressPanel({ restaurant, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-[50%] bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
    <h2 className="text-lg font-semibold text-textcolor">Lesson Progress</h2>
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
    {/* Stats Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-2.5 bg-background rounded-xl text-left">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Employees</h3>
        <p className="text-2xl font-bold text-textcolor">24</p>
        <p className="text-xs text-gray-500">Assigned Training</p>
      </div>
      <div className="p-2.5 bg-background rounded-xl text-left">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Modules Completed</h3>
        <p className="text-2xl font-bold text-textcolor">186</p>
        <p className="text-xs text-gray-500">Out of 192</p>
      </div>
      <div className="p-2.5 bg-background rounded-xl text-left">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Engagement Rate</h3>
        <p className="text-2xl font-bold text-textcolor">96.8%</p>
        <p className="text-xs text-gray-500">Last 30 Days</p>
      </div>
      <div className="p-2.5 bg-background rounded-xl text-left">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Completion</h3>
        <p className="text-2xl font-bold text-textcolor">45m</p>
        <p className="text-xs text-gray-500">Per Lesson</p>
      </div>
    </div>

    {/* Training Activity */}
    <div>
      <h3 className="text-sm font-medium mb-2 text-left text-textcolor">Training Activity (Last 30 Days)</h3>
      <div className="h-40 bg-background rounded-md flex items-end justify-between p-2">
        {[35, 45, 30, 50, 40, 60, 55, 25, 45, 55, 50, 40].map((height, index) => (
          <div key={index} className="w-4 bg-textcolor rounded-t" style={{ height: `${height}%` }}></div>
        ))}
      </div>
    </div>

    {/* Completion Rate by Role */}
    <div>
      <h3 className="text-sm font-medium mb-2 text-left text-textcolor">Completion Rate by Role</h3>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="w-full sm:w-[48%]">
          <div className="flex justify-between mb-1">
            <span className="text-sm">Managers</span>
            <span className="text-sm font-medium">98%</span>
          </div>
          <ProgressBar
            variant="dark"
            showLabel={false}
            value={98}
            max={100}
            className="h-2 bg-gray-100"
            progressClassName="bg-primary"
          />
        </div>
        <div className="w-full sm:w-[48%]">
          <div className="flex justify-between mb-1">
            <span className="text-sm">Employees</span>
            <span className="text-sm font-medium">92%</span>
          </div>
          <ProgressBar
            variant="dark"
            showLabel={false}
            value={92}
            max={100}
            className="h-2 bg-gray-100"
            progressClassName="bg-primary"
          />
        </div>
      </div>
    </div>

    {/* Overdue Lessons */}
    <div>
      <h3 className="text-sm font-medium mb-2 text-left text-textcolor">Overdue Lessons</h3>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex items-center bg-background p-2.5 rounded-xl w-full sm:w-[48%]">
          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
          <div className="flex-1 text-left">
            <p className="text-md font-medium">John Smith</p>
            <p className="text-xs text-gray-500">Wine Knowledge Module</p>
          </div>
          <div>
            <p className="text-xs text-textcolor">3 days</p>
          </div>
        </div>
        <div className="flex items-center bg-background p-2.5 rounded-xl w-full sm:w-[48%]">
          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
          <div className="flex-1 text-left">
            <p className="text-md font-medium">Emma Wilson</p>
            <p className="text-xs text-gray-500">Service Standards</p>
          </div>
          <div>
            <p className="text-xs text-textcolor">5 days</p>
          </div>
        </div>
      </div>
    </div>

    {/* Top Learners */}
    <div>
      <h3 className="text-sm font-medium mb-2 text-left text-textcolor">Top Learners</h3>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex items-center bg-background p-2.5 rounded-xl w-full sm:w-[48%]">
          <div className="h-6 w-6 rounded-full text-textcolor flex items-center justify-center text-xs font-medium mr-3">
            1
          </div>
          <div className="flex-1 text-left">
            <p className="text-md font-medium">Sarah Johnson</p>
            <p className="text-xs text-gray-500">100% Completion Rate</p>
          </div>
          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
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
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center bg-background p-2.5 rounded-xl w-full sm:w-[48%]">
          <div className="h-6 w-6 rounded-full text-textcolor flex items-center justify-center text-xs font-medium mr-3">
            2
          </div>
          <div className="flex-1 text-left">
            <p className="text-md font-medium">David Chen</p>
            <p className="text-xs text-gray-500">98% Completion Rate</p>
          </div>
          <div className="h-6 w-6 rounded-full flex items-center justify-center">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}