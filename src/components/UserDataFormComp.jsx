"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import docService from "@/appwrite/docServices";
import useCurrentUser from "@/custom-hooks/useCurrentUser";

export default function UserDataFormComp() {

  useCurrentUser()


  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUserId = useSelector((state) => state.auth.userData?.userId);

  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [existingDocument, setExistingDocument] = useState(null)
    useEffect(() => {
        const gettingCurrentUserDocument = async () => {
           try {
             const document =  await docService.getDocument(currentUserId);
             setExistingDocument(document);
             if(document){
                 alert("Document already exist")
             }else{
                alert("Document not exist , Fillup the form")
             }
           } catch (error) {
                console.log("document check failed:", error);
           }
        }

        if(currentUserId){
            gettingCurrentUserDocument()
        }
      
    }, [currentUserId])


        const updateUserDocument = async (data) => {
            const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null;
            if(file){
                await docService.deleteFile(existingDocument?.userImageId);
            }
            const updateFormData = await docService.updateDocument(currentUserId, {
                ...data, userImageId: file?.$id
            })
            if(updateFormData){
                alert("Form data updated successfully");
                router.replace("/")
            }
        }
        const createUserDocument = async (data) => {
            const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null;

            if(file){
                const createFormData = await docService.createDocument(currentUserId, {
                    ...data, userImageId: file?.$id
                })
                if(createFormData){
                    alert("User data saved successfully");
                    router.replace("/")
                }
            }
        }
    

        const createOrupdateFormFunction = async (data) => { //triggerd on onSubmit
            if(existingDocument){
                updateUserDocument(data)
            }else{
                createUserDocument(data)
            }
        }



  // useEffect(() => {
  //   const checkingUserDocumentCreated = async () => {
  //     try {
  //       return await docService.getDocument(currentUserId);
  //     } catch (error) {
  //       console.log("Document check failed:", error);
  //       return null;
  //     }
  //   };
  
  
  //   if (currentUserId) {
  //     userDocumentAlreadyExist();
  //   }
  // }, [currentUserId]);

  // const userDocumentAlreadyExist = async () => {
  //   const existingDocument = await checkingUserDocumentCreated();
  //   if (existingDocument) {
  //     alert("User document already exists! But you can update it.");
  //   } else {
  //     alert("User document does not exist! Please fill up the form.");
  //   }
  // };



  // const createOrUpdateFormChecking = async (data) => {
    
  //   if (existingDocument) { 
  //     // Update form data
  //     const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null;
  //     if (file) {

  //       await docService.deleteFile(document?.userImageId);
  //     }
  //     const updateFormData = await docService.updateDocument(currentUserId, {
  //       ...data,
  //       userImageId: file?.$id,
  //     });
  //     if (updateFormData) {
  //       alert("Form data updated successfully");
  //       router.replace("/");
  //     }
  //   } else {
  //     // Create new form
  //     const isUserImageUploaded = await docService.uploadFile(data.image[0]);
  //     data.userImageId = isUserImageUploaded.$id;
  
  //     if (isUserImageUploaded) {
  //       const isUserDocumentCreated = await docService.createDocument(currentUserId, data);
  //       if (isUserDocumentCreated) {
  //         router.replace("/");
  //         alert("User data saved successfully");
  //       } else {
  //         alert("Something went wrong");
  //       }
  //     }
  //   }
  // };

  // Watch the image input
  const imageFile = watch("image");

  // Update the image preview only when imageFile changes
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const previewUrl = URL.createObjectURL(imageFile[0]);
      setImagePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    await createOrupdateFormFunction(data);
  };

  const ErrorMessage = ({ message }) => (
    <p className="text-red-400 text-sm">{message}</p>
  );

  return (
    <main>
      {isAuthenticated ? (
        <div className="flex flex-col gap-2 items-center justify-center p-5 md:px-16">
          <h1 className="text-xl capitalize font-bold text-white">User Information Form</h1>
          <form
            className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-center items-center gap-4">
              {!imagePreview && (
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                />
              )}
              {imagePreview && (
                <Image
                  onClick={() => setImagePreview(null)}
                  src={imagePreview}
                  alt="preview"
                  width={100}
                  height={100}
                  className="w-18 rounded-xl grid place-items-center h-18"
                />
              )}
              {imagePreview && (
                <p className="text-sm md:text-xl">To change the image, click on the image</p>
              )}
            </div>
            {errors.image && <ErrorMessage message={errors.image.message} />}

            <input
              type="text"
              {...register("name", { required: "User name is required" })}
              placeholder="Name"
              className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}

            <input
              type="text"
              {...register("contact", { required: "Contact is required" })}
              placeholder="Contact"
              className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            />
            {errors.contact && <ErrorMessage message={errors.contact.message} />}

            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Address"
              className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            />
            {errors.address && <ErrorMessage message={errors.address.message} />}

            <input
              type="text"
              {...register("college", { required: "College is required" })}
              placeholder="College"
              className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            />
            {errors.college && <ErrorMessage message={errors.college.message} />}

            <select
              {...register("studentClass", { required: "Student class is required" })}
              className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <option value="">Select Class</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
              <option value="12th(revision)">12th (revision)</option>
            </select>
            {errors.studentClass && <ErrorMessage message={errors.studentClass.message} />}

            <input
              type="text"
              {...register("studentId", { required: "Student ID is required" })}
              placeholder="Student ID"
              className="block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            />
            {errors.studentId && <ErrorMessage message={errors.studentId.message} />}

            <button
              type="submit"
              className="block w-full px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <p className="text-sm md:text-xl text-red-400 capitalize">
              * To use the user dashboard, please complete this form. False inputs may be penalized.
            </p>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
          <h1 className="text-xl capitalize font-bold text-white">Please sign up first!</h1>
          <button
            onClick={() => router.push("/Authentication/signup")}
            className="w-20 px-4 py-2 mt-4 text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            Sign Up
          </button>
        </div>
      )}
    </main>
  );
}
