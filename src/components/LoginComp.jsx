
"use client"
import authService from '@/appwrite/authService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useForm} from 'react-hook-form';
import { useDispatch , useSelector } from 'react-redux';
import {login,logout} from '@/store/features/authSlice';


export default function LoginComp() {

    const router = useRouter()
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm()
    const onSubmit = async (data) => {

            const loginResponse = await authService.login(data);
            console.log(loginResponse)
            if (loginResponse) {
                dispatch(login(loginResponse)); // Assuming loginResponse contains userData
                router.replace("/user-dashboard");
            } else {
                alert("Login failed. Please check your credentials.");
            }
    };
    
    return (
        <div className="flex flex-col gap-2 items-center justify-center ">
            <h1 className="text-xl capitalize font-bold text-white">user login form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-2">
                <input type="text" {...register("email", {required: true})} placeholder="Email" className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" />
                {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                <input type="password" {...register("password", {required: true})} placeholder="Password" className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" />
                {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
                <button type="submit" disabled={isSubmitting} className="block w-full px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    {isSubmitting ? "loading..." : "login"}
                </button>
            </form>
            <h1 className='capitalize'>not have an account ?  <Link href="/Authentication/signup" className='font-bold capitalize'>register an account</Link></h1>
        </div>
    );
}