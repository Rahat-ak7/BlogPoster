import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../Store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authServices from "../AppWrite/auth";

function SignUp() {
  const send = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [err, setErr] = useState("");

  const create = async (data) => {
    setErr("");
    try {
      const registerUser = await authServices.createAccount(data);
      // console.log("🚀 ~ create ~ registerUser:", registerUser);
      if (registerUser) {
        const userData = await authServices.getCurrentUser();
        // console.log("🚀 ~ create ~ userData:", userData);
        if (userData) {
          send(storeLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setErr(error.message);
    }
  };
  return (
    <div className="flex w-full justify-center items-start mt-8 mb-8">
      <div className="mx-auto max-w-lg w-full bg-gray-200 p-10 rounded-xl border border-black/10">
        <div className="mb-3 flex justify-center">
          <span className="inline-block w-full max-w-[100px] ">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl text-center  font-bold leading-tight">
          Sign Up to create Account.
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have any Account?&nbsp;
          <Link
            to="/login"
            className=" font-medium text-primary transition-all duration-200 hover:underline"
          >
            Signin
          </Link>
        </p>
        {err && <p className=" text-red-600 mt-8 text-center">{err}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-4">
            <Input
              label="Full name:"
              placeholder="Enter your Fullname"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
            <Input
              label="Password:"
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button className="w-full text-white font-bold" type="submit">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
