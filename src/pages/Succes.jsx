import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Topnav from "@/components/TopNavbar";
import PaymentSucces from "@/components/payment/PaymentSucces";
import Breadcrumbs from "@/components/chart/Breadcrumbs";
import CheckoutAlert from "@/components/chart/CheckoutAlert";

const Succes = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      if (checkToken === "undefined") {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  }, [navigate]);

  return (
    <div>
      <Topnav isLogin={isLogin} isSearch={true}></Topnav>
      <Breadcrumbs isPayment={true} isSuccess={true}></Breadcrumbs>
      <CheckoutAlert
        type="Success"
        message="Terimakasih atas pembayaran transaksi"
      ></CheckoutAlert>
      <PaymentSucces></PaymentSucces>
    </div>
  );
};

export default Succes;
