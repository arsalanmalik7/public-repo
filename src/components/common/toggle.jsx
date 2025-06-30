import { useState } from "react"

const Toggle = ({ defaultChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  const handleToggle = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isChecked ? "bg-gray-800" : "bg-gray-300"
      }`}
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isChecked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  )
}

export default function TogglePage() {
  const [state, setState] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center  space-y-4">
      <Toggle defaultChecked={state} onChange={setState} />
      {/* <p className="text-lg">Toggle is {state ? "ON" : "OFF"}</p> */}
    </div>
  )
}
