import { useId } from "react";
import React from "react";

function Select({ label, options, className = "", ...props }, ref) {
  const id = useId;
  return (
    <div className="w-full">
      {label && <label htmlFor={id}></label>}

      <select
        {...props}
        id={id}
        ref={ref}
        className={`${className} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
