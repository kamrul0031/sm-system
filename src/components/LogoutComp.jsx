import authService from "@/appwrite/authService";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {logout} from '@/store/features/authSlice';

export default function LogoutComp() {


    const dispatch = useDispatch();
    const router = useRouter();
  const logoutBtnHandler = async () => {
    const isUserLoggedOut = await authService.logout();
    if (isUserLoggedOut) {
      alert("User logged out successfully");
      router.replace("/");
      dispatch(logout());
    }
  };

  return (
    <button
      onClick={logoutBtnHandler}
      className="capitalize w-20 px-4 py-2 mt-4 text-white bg-red-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    >
      Logout
    </button>
  );
}
