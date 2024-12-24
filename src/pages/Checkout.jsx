// pages/checkout.jsx
import React, { useEffect, useState } from "react";

import { FillData } from "./checkout/FillData";
import { ReviewData } from "./checkout/ReviewData";
import { PaymentList } from "./checkout/PaymentList";
import { Success } from "./checkout/Success";
import { InformationBar } from "@/components/checkout/InformationBar";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "react-router-dom";

export const Checkout = () => {
  const [currentStep, setCurrentStep] = useState("Isi Data");
  const [notification, setNotification] = useState({
    type: "Info",
    message: "Selesaikan pengisian data dalam 15 menit",
    countdown: true,
  });

  const [searchParams] = useSearchParams();
  const adultPassenger = parseInt(searchParams.get("adultPassenger"), 10) || 0;
  const childPassenger = parseInt(searchParams.get("childPassenger"), 10) || 0;
  const babyPassenger = parseInt(searchParams.get("babyPassenger"), 10) || 0;
  const totalPassengers = adultPassenger + childPassenger + babyPassenger;

  const [bankDetails, setBankDetails] = useState([]);
  const [billingDetails, setBillingDetails] = useState({});
  const [flightDetails, setFlightDetails] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState(
    Array(totalPassengers).fill({})
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    let timer;
    if (notification.countdown) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [notification]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSaveData = () => {
    setCurrentStep("Bayar Review");
    setNotification({
      type: "Success",
      message: "Data berhasil disimpan",
      countdown: false,
    });
  };

  const handleProceedToPayment = () => {
    setCurrentStep("Bayar List");
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 1);
    setNotification({
      type: "Warning",
      message: `Selesaikan pembayaran sebelum tanggal ${deadline.toLocaleDateString(
        "id-ID"
      )}`,
      countdown: false,
    });
  };

  const handlePaymentComplete = () => {
    setCurrentStep("Selesai");
    setNotification({
      type: "Success",
      message: "Pembayaran berhasil!",
      countdown: false,
    });
  };

  return (
    <div className="w-full">
      {/* Information Bar */}
      <InformationBar
        currentStep={currentStep}
        notification={notification}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />

      {/* Conditional Step Rendering */}
      <div>
        {currentStep === "Isi Data" && (
          <FillData
            handleSaveData={handleSaveData}
            billingDetails={billingDetails}
            setBillingDetails={setBillingDetails}
            flightDetails={flightDetails}
            setFlightDetails={setFlightDetails}
            passengerDetails={passengerDetails}
            setPassengerDetails={setPassengerDetails}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        )}
        {currentStep === "Bayar Review" && (
          <ReviewData
            handleProceedToPayment={handleProceedToPayment}
            setBankDetails={setBankDetails}
            billingDetails={billingDetails}
            setBillingDetails={setBillingDetails}
            flightDetails={flightDetails}
            setFlightDetails={setFlightDetails}
            passengerDetails={passengerDetails}
            setPassengerDetails={setPassengerDetails}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        )}
        {currentStep === "Bayar List" && (
          <PaymentList
            handlePaymentComplete={handlePaymentComplete}
            bankDetails={bankDetails}
          />
        )}
        {currentStep === "Selesai" && <Success />}
      </div>
    </div>
  );
};
