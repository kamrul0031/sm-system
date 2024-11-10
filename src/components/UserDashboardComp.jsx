"use client"
import {useRouter} from 'next/navigation';
import {useSelector} from 'react-redux';
import Image from 'next/image';
import LogoutComp from './LogoutComp';

export default function UserDashboardComp(){

    const router = useRouter()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const editBtnHandler = () => {

    }
   
    return(
        <div>
            {!isAuthenticated ? 
            (<div className="flex flex-col gap-2 items-center justify-center h-screen">
                <h1 className='text-xl capitalize font-bold'>you are not loged in , login first</h1>
                <button onClick={() => router.push("/Authentication/login")} className=" w-20 px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">login</button>

            </div>) : 
            (<div className="flex flex-col gap-2 items-center justify-center h-screen">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-2 lg:flex-row lg:gap-8 lg:p-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-white self-center">[user] dashboard</h1>
                        <Image src="/user.png" width={100} height={100} alt="User" className="rounded-xl self-center" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-lg font-semibold text-white">Information</h1>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-sm font-light text-gray-400">Email : 0f5tH@example.com</h1>
                                <h1 className="text-sm font-light text-gray-400">Contact : 01234567890</h1>
                                <h1 className="text-sm font-light text-gray-400">Address : Chattogram, Bangladesh</h1>
                                <h1 className="text-sm font-light text-gray-400">College : Bangladesh University</h1>
                                <h1 className="text-sm font-light text-gray-400">Class : 12th (Revision)</h1>
                                <h1 className="text-sm font-light text-gray-400">Student ID : 123456</h1>
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
                    <div className='flex gap-3 self-center'>
                        <button onClick={editBtnHandler} className="capitalize w-20 px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">edit</button>
                        <LogoutComp/>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
