"use client";
const { default: authService } = require("@/appwrite/authService");
const { login, logout } = require("@/store/features/authSlice");
const { useRouter } = require("next/router");
const { useEffect } = require("react");
const { useDispatch } = require("react-redux");

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchingCurrentUser = async () => {
      const response = await authService.getCurrentUser();

      if (response?.status) {
        console.log(response);
        const userWithId = { userId: response.$id, ...response };
        dispatch(login(userWithId));
      } else {
        dispatch(logout());
      }
    };

    fetchingCurrentUser();
  }, [dispatch]);
};

export default useCurrentUser;
