import React from "react";
import { useDispatch } from "react-redux";
import authSerivces from "../../AppWrite/auth";
import { logOut } from "../../Store/authSlice";

function LogOutBtn() {
  const send = useDispatch();
  const logOutHandler = () => {
    authSerivces.LogOut().then(() => {
      send(logOut());
    });
  };
  return (
    <button
      onClick={logOutHandler}
      className="bg-red-600 p-2 rounded-[15px] text-white hover:bg-red-700 focus:ring-red-500"
    >
      Logout
    </button>
  );
}

export default LogOutBtn;
