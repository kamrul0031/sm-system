"use client";

import authService from "@/appwrite/authService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export default function HomeContainer() {
  const [authStatus, setAuthStatus] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fethcCurrentUser = async () => {
      const authenticatedUser = await authService.getCurrentUser();
      if (authenticatedUser) {
        dispatch(login(authenticatedUser));
        setAuthStatus(true);
      } else {
        dispatch(logout());
      }
    };
    fethcCurrentUser();
  }, [dispatch]);

  const logoutHandler = async () => {
    const isUserLoggedOut = await authService.logout();
    if (isUserLoggedOut) {
      alert("User logged out successfully");
      router.repalace("/Authentication/login");
    }
    dispatch(logout());
    setAuthStatus(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>HomeContainer</h1>
      <p className="m-20">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
        eum ipsam porro harum, ullam, ab quibusdam iusto a eligendi deleniti
        exercitationem. Facere, et. Optio delectus fuga eveniet esse laborum
        vitae porro mollitia, reiciendis rerum a vel enim ratione. Eligendi
        harum nesciunt explicabo cum. Eligendi error nobis facilis autem, natus
        deleniti!
      </p>
      {authStatus ? (
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/Authentication/userDashboard")}
            className=" w-auto px-4 py-2 mt-4 capitalize text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            user dashboard
          </button>
          <button
            onClick={logoutHandler}
            className=" w-20 px-4 py-2 mt-4 capitalize text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/Authentication/login")}
            className=" w-20 px-4 py-2 mt-4 capitalize text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            login
          </button>
          <button
            onClick={() => router.push("/Authentication/signup")}
            className=" w-20 px-4 py-2 mt-4 captalize text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            signup
          </button>
        </div>
      )}
    </div>
  );
}
