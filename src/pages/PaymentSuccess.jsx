import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Topnav from "@/components/TopNavbar";
import Breadcrumbs from "@/components/chart/Breadcrumbs";
import CheckoutAlert from "@/components/chart/CheckoutAlert";
import FlightDetails from "@/components/chart/FlightDetails";
import CheckoutPricing from "@/components/chart/CheckoutPricing";
import { flightDetails } from "../lib/flightDummy";
import { passenger } from "@/lib/generatePassenger";
import Passenger from "@/components/chart/Passenger";
import PaymentCompleted from "@/components/payment/PaymentCompleted";

const PaymentSuccess = () => {
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
      <Breadcrumbs isPayment={true} isSuccess={false} />
      <CheckoutAlert
        type="Success"
        message="Terimakasih atas pembayaran transaksi"
      />
      <div className="my-5 flex flex-col md:flex-row md:justify-center md:items-center lg:items-start lg:justify-center gap-10">
        <div className="flex flex-col gap-10">
          <PaymentCompleted />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
