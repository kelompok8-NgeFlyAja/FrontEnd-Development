import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import OtpInput from "@/components/OtpInput";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import useSend from "@/hooks/useSend";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Otp = () => {
  const { loading, sendData } = useSend();
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [countdown, setCountdown] = useState(900);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  useEffect(() => {
    const userEmail = cookies.get("userEmail");
    const checkToken = cookies.get("token");
    if (checkToken && checkToken !== "undefined") {
      navigate("/");
    }

    if (!userEmail || userEmail === "undefined") {
      navigate("/register");
    } else {
      setEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    return `${localPart.charAt(0)}*****@${domain}`;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return minutes > 0
      ? `${minutes} menit ${seconds} detik`
      : `${seconds} detik`;
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        cookies.remove("userEmail", { path: "/" });
        navigate(`/login`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const otpString = otp.join("");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/verify-otp`,
        { otp: otpString }
      );
  
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage(response.data.message);
      } else {
        setIsSuccess(false);
        setMessage(response.data.message || "Verification failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        navigate("/error");
      } else if(error.response && error.response.status === 400){
        setIsSuccess(false);
        setMessage(error.response.data.message || "Failed to resend OTP.");
      }else{
        setIsSuccess(false);
        console.error("Error verifying OTP:", error);
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/resend-otp`,
        { email }
      );
  
      if (response.status === 200) {
        setCountdown(900);
        setIsSuccess(true);
        setMessage("OTP has been resent. Please check your email.");
      } else {
        setIsSuccess(false);
        setMessage(response.data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        navigate("/error");
      } else if(error.response && error.response.status === 400){
        setIsSuccess(false);
        setMessage(error.response.data.message || "Failed to resend OTP.");
      }else{
        console.error("Error resending OTP:", error);
        setIsSuccess(false);
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Navbar isSearch={false} isOTP={true} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col h-[75vh] justify-center overflow-hidden">
        <div>
          <button className="p-3">
            <Link to="/account">
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-10 bg-gray-100 px-5 rounded-lg shadow-md w-full md:w-4/5">
            <motion.h1
              initial={{ opacity: 0, x: -75 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              viewport={{ once: true }}
              className="text-xl font-bold text-left w-full"
            >
              Masukkan OTP
            </motion.h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-20">
              <div className="flex flex-col gap-4">
                <p className="text-center text-sm w-full">
                  Ketik 6 digit kode yang dikirimkan ke{" "}
                  <span className="font-bold">{email && maskEmail(email)}</span>
                </p>
                <div className="flex justify-center w-full">
                  <OtpInput onChange={(updatedOtp) => setOtp(updatedOtp)} />
                </div>
                <p className="text-center w-full text-sm">
                  {countdown > 0 ? (
                    <>Kirim Ulang OTP dalam {formatTime(countdown)}</>
                  ) : (
                    <button
                      type="button"
                      className="text-[#FF0000] font-bold"
                      onClick={handleResend}
                    >
                      Kirim Ulang OTP
                    </button>
                  )}
                </p>
              </div>
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-[#7126B5] text-white rounded-2xl hover:bg-[#7126B5]/50 w-full"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default Otp;
