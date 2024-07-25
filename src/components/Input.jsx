import { useId } from "react";
import React from "react";
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId;
  return (
    <div>
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-lg font-bold
        "
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        className={`${className} rounded-[10px] w-[25vw] p-[5px] bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
