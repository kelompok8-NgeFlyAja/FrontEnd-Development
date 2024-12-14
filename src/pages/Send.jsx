import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import useSend from "@/hooks/useSend";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import axios from "axios";

const Send = () => {
  const { loading, sendData } = useSend();
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [login, setLogin] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: false,
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken && checkToken !== "undefined") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate(`/send-email`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const validateForgotPwd = () => {
    let valid = true;
    let errorMessage = "";
    const newErrors = {
      email: false,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (login.email.trim() === "") {
      newErrors.email = true;
      errorMessage = "Field Email Tidak Boleh Kosong!";
      valid = false;
    } else if (!emailRegex.test(login.email)) {
      newErrors.email = true;
      errorMessage = "Format Email Tidak Valid!";
      valid = false;
    }

    setErrors(newErrors);
    setMessage(errorMessage || "Loading...");
    return valid;
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    if (validateForgotPwd()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/verify-email`, {
          email: login.email,
        });
  
        if (response.data.statusCode === 400) {
          setIsSuccess(false);
          setMessage(response.data.message);
        } else {
          setIsSuccess(true);
          setResetToken(response.data.token);
          setMessage("Tautan reset password terkirim ke email Anda.");
        }
      } catch (err) {
        if (err.response?.status === 500) {
          navigate("/error");
        } else {
          console.error(err);
          setIsSuccess(false);
          setMessage(err.response?.data?.message || "Terjadi kesalahan, coba lagi.");
        }
      }
    } else {
      setIsSuccess(false);
      setMessage("Pastikan semua data valid sebelum mengirim.");
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -75 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.25 }}
        className="hidden md:block w-1/2 h-screen"
      >
        <img
          src="/Auth_Side_Background.png"
          alt="Auth Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 md:from-white md:to-white h-screen">
        <motion.form
          initial={{ opacity: 0, x: 75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-4 md:space-y-6 w-full max-w-md p-6 py-10 bg-white md:bg-transparent rounded-md md:rounded-none shadow-md md:shadow-none"
          onSubmit={handleForgotPassword}
          method="POST"
        >
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-black md:text-2xl">
              <Link
                to="/login"
                className="bg-[#7126B5] rounded-full p-1 text-white hover:bg-[#7126B5]/90"
              >
                <IoMdArrowRoundBack />
              </Link>
              Reset Password
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <label
              htmlFor="email"
              className="block mb-2 text-xs font-normal text-black"
            >
              Email/No Telepon
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={`bg-gray-50 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
              placeholder="Contoh: johndoe@gmail.com"
              value={login.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.25 }}
            type="submit"
            disabled={loading || isSuccess}
            className={`w-full text-white bg-[#7126B5] hover:bg-[#7126B5]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading || isSuccess ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Kirim"}
          </motion.button>
          {isSuccess !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex justify-center mt-4"
            >
              <div
                className={`${
                  isSuccess ? "bg-[#73CA5C]" : "bg-[#FF0000]"
                } text-center text-white text-sm font-medium px-6 py-4 rounded-xl inline-block`}
              >
                <h1>{message}</h1>
              </div>
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Send;
