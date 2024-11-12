"use client";

import authService from "@/appwrite/authService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import LogoutComp from "./LogoutComp";
import useCurrentUser from "@/custom-hooks/useCurrentUser";

export default function HomeContainer() {
  useCurrentUser();

  const dispatch = useDispatch();
  const router = useRouter();
  const storeAuthStatus = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>HomeContainer</h1>
      {storeAuthStatus ? (
        <div className="flex gap-3">
          <button
            onClick={() => router.replace("/user-dashboard")}
            className=" w-auto px-4 py-2 mt-4 capitalize text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            user dashboard
          </button>
          <LogoutComp />
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => router.replace("/Authentication/login")}
            className=" w-20 px-4 py-2 mt-4 capitalize text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            login
          </button>
          <button
            onClick={() => router.replace("/Authentication/signup")}
            className=" w-20 px-4 py-2 mt-4 capitalize text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            signup
          </button>
        </div>
      )}
    </div>
  );
}

