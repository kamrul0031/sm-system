"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import docService from "@/appwrite/docServices";


export default function UserDataFormComp() {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    const router = useRouter()



  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  


  // Watch the image input
  const imageFile = watch("image");
  // Use useEffect to update the image preview only when the imageFile changes
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const previewUrl = URL.createObjectURL(imageFile[0]);
      setImagePreview(previewUrl);

      // Cleanup the URL object when component unmounts or new file is chosen
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [imageFile]);


  const currentUser_id = useSelector((state) => state.auth.userData?.userId);
  console.log(currentUser_id)

  const onSubmit = async (data) => {

    const isUserImageUploaded = await docService.uploadFile(data.image[0]);
    data.userImageId = isUserImageUploaded.$id
    data.currentUserId = currentUser_id

    if (isUserImageUploaded) {
      const isUserDocumentCreated = await docService.createDocument(data);
      if (isUserDocumentCreated) {
        router.refresh("/")
        alert("user data saved successfully")
      }else{
        alert("something went wrong")
      }
    }
  };


  return (
    <main>
      {isAuthenticated ? (<div className="flex flex-col gap-2 items-center justify-center p-5 md:px-16">
        <h1 className="text-xl capitalize font-bold text-white">user information form</h1>
      <form
        className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          {!imagePreview && <input
            type="file"
            accept="image/*"
            {...register("image", { required: "image is required" })}
            className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          />}
          {imagePreview && (
            <Image
            onClick={() => setImagePreview(null)}
              src={imagePreview}
              alt="preview"
              width={100} // Adjust width as needed
              height={100} // Adjust height as needed
              className="w-18 rounded-xl grid place-items-center h-18"
            />
          )}
         {imagePreview && <p className="text-sm md:text-xl">To change the image, click on the image</p>}
        </div>
        {errors.image && (
          <p className="text-red-400 text-sm">{errors.image.message}</p>
        )}
        <input
          type="text"
          {...register("name", { required: "user name is required" })}
          placeholder="Name"
          className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}
        <input
          type="text"
          {...register("contact", { required: "contact is required" })}
          placeholder="Contact"
          className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        />
        {errors.contact && (
          <p className="text-red-400 text-sm">{errors.contact.message}</p>
        )}
        <input
          type="text"
          {...register("address", { required: "address is required" })}
          placeholder="Address"
          className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        />
        {errors.address && (
          <p className="text-red-400 text-sm">{errors.address.message}</p>
        )}
        <input
          type="text"
          {...register("college", { required: "college is required" })}
          placeholder="College"
          className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        />
        {errors.college && (
          <p className="text-red-400 text-sm">{errors.college.message}</p>
        )}
        <select
          {...register("studentClass", {
            required: "student class is required",
          })}
          className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <option value="">Select Class</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
          <option value="12th(revision)">12th (revision)</option>
        </select>
        {errors.studentClass && (
          <p className="text-red-400 text-sm">{errors.studentClass.message}</p>
        )}
        <input
          type="text"
          {...register("studentId", { required: "student ID is required" })}
          placeholder="Student ID"
          className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        />
        {errors.studentId && (
          <p className="text-red-400 text-sm">{errors.studentId.message}</p>
        )}
        <button
          type="submit"
          className="block w-full px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p className="text-sm md:text-xl text-red-400 capitalize">* for use user dashboard , you need to fill this form | useless inputs might be punishable !</p>
      </form>

      </div>) : (<div className="flex flex-col gap-2 items-center justify-center h-screen">
        <h1 className="text-xl capitalize font-bold text-white">please signup first !!!</h1>
        <button onClick={() => router.push("/Authentication/signup")} className=" w-20 px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">signup</button>
        </div>)}
    </main>
    
  );
}
