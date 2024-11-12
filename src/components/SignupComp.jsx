"use client"
import authService from '@/appwrite/authService';
import { login,logout } from '@/store/features/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function SignupComp() {

    const dispatch = useDispatch()
    const router = useRouter()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm()
    const onSubmit = async(data) => {
     const isUserLogedIn = await authService.createAccount(data)       
       if(isUserLogedIn){
        dispatch(login(isUserLogedIn))
        router.replace("/user-dashboard")
       }else{
        alert("something went wrong")
        dispatch(logout())
       }
    }
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <h1 className="text-xl capitalize font-bold text-white">user registation form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-2">
                <input type="text" {...register("email", {required: "email is required"})} placeholder="Email" className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" />
                {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                <input type="password" {...register("password", {required: "password is required"})} placeholder="Password" className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" />
                {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
                <input type="text" {...register("name", {required: "name is required"})} placeholder="Name" className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" />
                {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                <button type="submit" disabled={isSubmitting} className="block w-full px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    {isSubmitting ? "Signing up..." : "Signup"}
                </button>
            </form>
            <h1 className='capitalize'>already have an account ?  <Link href="/Authentication/login" className='font-bold capitalize'>login</Link></h1>
        </div>
    );
}
