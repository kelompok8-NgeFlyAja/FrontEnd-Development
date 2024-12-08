import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import PaymentMethod from "@/components/payment/PaymentMethod";
import Topnav from "@/components/TopNavbar";
import Breadcrumbs from "@/components/checkout/Breadcrumbs";
import CheckoutAlert from "@/components/checkout/CheckoutAlert";
import FlightDetails from "@/components/checkout/FlightDetails";
import CheckoutPricing from "@/components/checkout/CheckoutPricing";
import NotificationItem from "@/components/notificationitem/NotificationItem";
import { flightDetails } from "../lib/flightDummy";
import { passenger } from "@/lib/generatePassenger";
import Passenger from "@/components/checkout/Passenger";

const Payment = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [notifications, setNotifications] = useState([]);
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

  useEffect(() => {
    const fetchNotifications = async () => {
      const mockNotifications = [
        { title: "Status pembayaran(unpaid)", 
          date: new Date().toISOString(),
          message: "Selesaikan pembayaran Anda sebelum tanggal 10 Maret 2023!", 
          is_read: false },
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();
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
      {notifications.length > 0 && (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-4">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              date={notification.date}
              message={notification.message}
              extraMessage={notification.extraMessage}
              is_read={notification.is_read}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Payment;
