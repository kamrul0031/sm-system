"use client";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import LogoutComp from './LogoutComp';
import { useEffect, useState } from 'react';
import docService from '@/appwrite/docServices';

export default function UserDashboardComp() {
    const [userData, setUserData] = useState({});
    const [userImgUrl, setUserImgUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const currentUserId = useSelector((state) => state.auth.userData?.$id);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (!currentUserId) return;

        const gettingUserData = async () => {
            try {
                const userData = await docService.getDocument(currentUserId);
                setUserData(userData);

                if (userData.userImageId) {
                    const userImgUrl = await docService.getFilePreview(userData.userImageId);
                    setUserImgUrl(userImgUrl);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        gettingUserData();
    }, [currentUserId]);

    const editBtnHandler = () => {
        // Edit button logic here
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col gap-2 items-center justify-center h-screen">
                <h1 className="text-xl capitalize font-bold">You are not logged in, login first</h1>
                <button
                    onClick={() => router.push("/Authentication/login")}
                    className="w-20 px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-2 lg:flex-row lg:gap-8 lg:p-12">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold text-white self-center">{userData.name} Dashboard</h1>
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
                            <h1 className="text-sm font-light text-gray-400">Email : {userData.email || "N/A"}</h1>
                            <h1 className="text-sm font-light text-gray-400">Contact : {userData.contact || "N/A"}</h1>
                            <h1 className="text-sm font-light text-gray-400">Address : {userData.address || "N/A"}</h1>
                            <h1 className="text-sm font-light text-gray-400">College : {userData.college || "N/A"}</h1>
                            <h1 className="text-sm font-light text-gray-400">Class : {userData.studentClass || "N/A"}</h1>
                            <h1 className="text-sm font-light text-gray-400">Student ID : {userData.studentId || "N/A"}</h1>
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
                        Edit
                    </button>
                    <LogoutComp />
                </div>
            </div>
        </div>
    );
}
