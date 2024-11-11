"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LogoutComp from "./LogoutComp";
import { useEffect, useState } from "react";
import docService from "@/appwrite/docServices";
import UserDataForm from "@/app/Authentication/user-data-form/page";
import LoginComp from "./LoginComp";
import UserDataFormComp from "./UserDataFormComp";

export default function UserDashboardComp() {
  const [userData, setUserData] = useState({});
  const currentUserId = useSelector((state) => state.auth.userData?.userId);
  const [userImgUrl, setUserImgUrl] = useState(null);
  const [useFormFilledup, setuseFormFilledup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkingUserFormFilledUp = async () => {
      try {
        const isUserFillupedForm = await docService.getDocument(currentUserId);
        if (isUserFillupedForm) {
            const gettingUserData = await docService.getDocument(currentUserId);
            console.log(gettingUserData)
            if (gettingUserData) {
            setUserData(gettingUserData);
            const userImgUrl = await docService.getFilePreview(
              gettingUserData?.userImageId
            );
            setUserImgUrl(userImgUrl);
            setuseFormFilledup(true);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    checkingUserFormFilledUp();
  }, []);

  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const editBtnHandler = () => {};

  

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-xl font-bold text-white capitalize">
          you are not logged in | login first
        </h1>
        <LoginComp />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-xl font-bold text-white capitalize">Loading...</h1>
      </div>
    );
  }
  if(!useFormFilledup){
    return(
        <div className="flex flex-col h-screen items-center justify-center">
          <h1 className="text-xl font-bold text-white capitalize">
            you need to fill up the user form
          </h1>
          <UserDataFormComp />
        </div>
    )
  }

  return (
    <div>
        <div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-2 lg:flex-row lg:gap-8 lg:p-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-white self-center">
                {userData.name} dashboard
              </h1>
              {userImgUrl && (
                <img
                  src={userImgUrl}
                  width={100}
                  height={100}
                  alt="User"
                  className="rounded-xl self-center"
                />
              )}
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-semibold text-white">
                  Information
                </h1>
                <div className="flex flex-col gap-1">
                  <h1 className="text-sm font-light text-gray-400">
                    Email : 0f5tH@example.com
                  </h1>
                  <h1 className="text-sm font-light text-gray-400">
                    Contact : {userData.contact}
                  </h1>
                  <h1 className="text-sm font-light text-gray-400">
                    Address : {userData.address}
                  </h1>
                  <h1 className="text-sm font-light text-gray-400">
                    College : {userData.college}
                  </h1>
                  <h1 className="text-sm font-light text-gray-400">
                    Class : {userData.studentClass}
                  </h1>
                  <h1 className="text-sm font-light text-gray-400">
                    Student ID : {userData.studentId}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-white">
                Payment Information
              </h1>
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-light text-gray-400">
                  Joining Date : 12/12/2022
                </h1>
                <h1 className="text-sm font-light text-gray-400">
                  Last Payment : 12/12/2022
                </h1>
                <h1 className="text-sm font-light text-gray-400">
                  Due Payments : 2 months
                </h1>
              </div>
            </div>
            <div className="flex gap-3 self-center">
              <button
                onClick={editBtnHandler}
                className="capitalize w-20 px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                edit
              </button>
              <LogoutComp />
            </div>
          </div>
        </div>
    </div>
  );
}

