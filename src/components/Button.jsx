import React from "react";

function Button({
  BtnTxt,
  children,
  type = "button",
  bgColour = "bg-blue-500",
  textColor = "white",
  className = "",
  ...props
}) {
  return (
    <div>
      <button
        className={`px-4  py-3    rounded-lg ${className} ${bgColour} ${textColor}   `}
        {...props}
      >
        {/* {BtnTxt} */}
        {children || BtnTxt}
      </button>
    </div>
  );
}

export default Button;
