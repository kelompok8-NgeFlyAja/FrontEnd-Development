import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircle, IoMdArrowRoundBack } from "react-icons/io";
import Cookies from "universal-cookie";
import Topnav from "@/components/TopNavbar";
import { motion } from "framer-motion";
import AccountItem from "@/components/account/AccountItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountSideNav from "@/components/account/AccountSideNav";
import AccountSkeleton from "@/components/account/AccountContentSkeleton";
import AccountSideNavSkeleton from "@/components/account/AccountSideNavSkeleton";
import { jwtDecode } from "jwt-decode";
import useSend from "@/hooks/useSend";
import axios from "axios";

const Account = () => {
  const { loading, sendData } = useSend();
  const [accountId, setAccountId] = useState("1");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerify, setIsVerify] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (!checkToken) {
      navigate("/");
    }
  }, [isLoggedOut]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (!checkToken) {
      navigate("/");
    } else {
      fetchUserData();
    }
  }, [isLoggedOut]);

  const fetchUserData = async () => {
    const token = cookies.get("token");
    if (token) {
      try {
        const response = await axios.get("https://ngeflyaja.shop/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile({
          name: response.data.data.name,
          telepon: response.data.data.phoneNumber,
          email: response.data.data.email,
        });
        setIsVerify(response.data.data.is_verified);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized. Please log in again.");
          cookies.remove("token", { path: "/" });
          navigate("/login");
        } else {
          toast.error("Error fetching user data.");
        }
      }
    }
  };
  const handleLogout = async (event) => {
    setActiveSection("logout");
    cookies.remove("token");
    setIsLoggedOut(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name) {
      toast.error("Name cannot be empty");
      return;
    }

    if (!profile.telepon) {
      toast.error("Telepon cannot be empty");
      return;
    }

    if (!profile.email) {
      toast.error("Email cannot be empty");
      return;
    }

    if (!validateEmail(profile.email)) {
      toast.error("Invalid email format");
      return;
    }

    setWaiting(true);

    try {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const userData = {
        name: profile.name,
        phoneNumber: profile.telepon,
        email: profile.email,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/update-user`,
        userData,
        config
      );

      setTimeout(() => {
        setProfile({
          name: response.data.data.name || "Unknown",
          telepon: response.data.data.phoneNumber || "Not provided",
          email: response.data.data.email || "Not provided",
        });
        setWaiting(false);
        toast.success("Profile saved successfully");
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        setWaiting(false);
      }, 3000);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || "Invalid input data.");
      } else if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else if (error.response && error.response.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(
          error.response.data.error || "An unexpected error occurred."
        );
      }
    }
  };

  return (
    <>
      <div className="w-11/12 md:w-2/3 mx-auto mt-28 flex flex-col gap-5 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-xl font-bold"
        >
          Akun
        </motion.h1>
        <div className="flex justify-between items-center gap-5 mx-4 md:mb-5">
          <motion.div
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            viewport={{ once: true }}
            className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 rounded-lg"
          >
            <Link to="/">
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
            <h3 className="text-base">Beranda</h3>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mx-4">
          {isLoading ? (
            <AccountSideNavSkeleton />
          ) : (
            <AccountSideNav
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              handleLogout={handleLogout}
            />
          )}
          <div className="flex-grow">
            {isLoading ? (
              <AccountSkeleton />
            ) : (
              <AccountItem
                handleLogout={handleLogout}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                profile={profile}
                setProfile={setProfile}
                loading={waiting}
                activeSection={activeSection}
                isVerify={isVerify}
                accountId={accountId}
              />
            )}
          </div>
        </div>
      </div>
      {isLoggedOut && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 px-40 rounded-md shadow-md z-50">
            <IoMdCheckmarkCircle className="text-green-500 text-8xl md:text-9xl" />
            <h2 className="text-center text-green-500 font-bold text-3xl md:text-4xl">
              Anda Berhasil Logout
            </h2>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Account;
