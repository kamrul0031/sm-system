"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import LogoutComp from "./LogoutComp";
import { useEffect, useState } from "react";
import docService from "@/appwrite/docServices";
import LoginComp from "./LoginComp";
import UserDataFormComp from "./UserDataFormComp";
import authService from "@/appwrite/authService";
import {login,logout} from '@/store/features/authSlice';

export default function UserDashboardComp() {
  const [userDocument, setUserDocument] = useState({});
  const currentUserId = useSelector((state) => state.auth.userData?.userId);
  // console.log("currentUserId", currentUserId);
  const [userImgUrl, setUserImgUrl] = useState(null);
  const [useFormFilledup, setUseFormFilledup] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const checkingUserFormFilledUp = async () => {
      try {
        const isUserFillupedForm = await docService.getDocument(currentUserId);
        // console.log("isUserFillupedForm", isUserFillupedForm);
        if (isUserFillupedForm) {
          const gettingUserData = await docService.getDocument(currentUserId);
          setUserDocument(gettingUserData);
          const userImgUrl = await docService.getFilePreview(gettingUserData?.userImageId);
          setUserImgUrl(userImgUrl);
          setUseFormFilledup(true);
        }else{
          setUseFormFilledup(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkingUserFormFilledUp();
  }, [currentUserId]);

  const editBtnHandler = () => {};

  const conditionalRenderedComp = () => {
    if (loading) return lodingComp();
    if (!isAuthenticated) return notAuthComp();
    if (isAuthenticated && !useFormFilledup) return userDataNotFilledUpComp();
    if (isAuthenticated && useFormFilledup) return userDocumentComp({ userDocument, userImgUrl , editBtnHandler });
  };

  return conditionalRenderedComp();
}

const lodingComp = () => (
  <div className="flex flex-col h-screen items-center justify-center">
    <h1 className="text-xl font-bold text-white capitalize">Loading...</h1>
  </div>
);

const notAuthComp = () => (
  <div className="flex flex-col h-screen items-center justify-center">
    <h1 className="text-xl font-bold text-white capitalize">
      you are not logged in | login first
    </h1>
    <LoginComp />
  </div>
);

const userDataNotFilledUpComp = () => (
  <div className="flex flex-col h-screen items-center justify-center">
    <h1 className="text-xl font-bold text-white capitalize">
      you need to fill up the user form
    </h1>
    <UserDataFormComp />
  </div>
);

const userDocumentComp = ({ userDocument, userImgUrl , editBtnHandler }) => (
  <div className="flex flex-col gap-2 items-center justify-center h-screen">
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col gap-2 lg:flex-row lg:gap-8 lg:p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-white self-center">
          {userDocument.name} dashboard
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
          <h1 className="text-lg font-semibold text-white">Information</h1>
          <div className="flex flex-col gap-1">
            <h1 className="text-sm font-light text-gray-400">Email : {userDocument.email}</h1>
            <h1 className="text-sm font-light text-gray-400">Contact : {userDocument.contact}</h1>
            <h1 className="text-sm font-light text-gray-400">Address : {userDocument.address}</h1>
            <h1 className="text-sm font-light text-gray-400">College : {userDocument.college}</h1>
            <h1 className="text-sm font-light text-gray-400">Class : {userDocument.studentClass}</h1>
            <h1 className="text-sm font-light text-gray-400">Student ID : {userDocument.studentId}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold text-white">Payment Information</h1>
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-light text-gray-400">Joining Date : 12/12/2022</h1>
          <h1 className="text-sm font-light text-gray-400">Last Payment : 12/12/2022</h1>
          <h1 className="text-sm font-light text-gray-400">Due Payments : 2 months</h1>
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
);

