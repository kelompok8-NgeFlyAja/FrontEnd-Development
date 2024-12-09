import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import PaymentMethod from "@/components/payment/PaymentMethod";
import Topnav from "@/components/TopNavbar";
import Breadcrumbs from "@/components/checkout/Breadcrumbs";
import CheckoutAlert from "@/components/checkout/CheckoutAlert";
import FlightDetails from "@/components/checkout/FlightDetails";
import CheckoutPricing from "@/components/checkout/CheckoutPricing";
import { flightDetails } from "../lib/flightDummy";
import { passenger } from "@/lib/generatePassenger";
import Passenger from "@/components/checkout/Passenger";

const Payment = () => {
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

  const [flightDetail, setFlightDetail] = useState([]);
  const [passengerInfo, setPassengerInfo] = useState([]);

  useEffect(() => {
    setFlightDetail(flightDetails());
    setPassengerInfo(passenger.sort());
  }, []);

  return (
    <div>
      <Topnav isLogin={isLogin} isSearch={true} />
      <Breadcrumbs isPayment={true} isSuccess={false} />
      <CheckoutAlert
        type="Danger"
        message="Selesaikan Pembayaran sampai [10 Maret 2023 12:00]"
      />
      <div className="my-5 flex flex-col md:flex-row md:justify-center md:items-center lg:items-start lg:justify-center gap-10">
        <div className="flex flex-col gap-10">
          <PaymentMethod />
        </div>
        <div className="px-5 lg:px-0">
          <FlightDetails flightDetail={flightDetail} isPayment={true} />
          <CheckoutPricing passengerInfo={passengerInfo} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
