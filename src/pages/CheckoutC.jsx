import { InformationBar } from "@/components/checkoutC/InformationBar";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";

export const CheckoutC = () => {
  const [currentStep, setCurrentStep] = useState("Isi Data");
  const [notification, setNotification] = useState({
    type: "Info",
    message: "Selesaikan dalam",
    countdown: true,
  });
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 menit

  // Countdown Timer
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
      message: "Data Anda berhasil tersimpan!",
      countdown: false,
    });
  };

  const handleProceedToPayment = () => {
    setCurrentStep("Bayar List");
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 1);
    const formattedDate = deadline.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    setNotification({
      type: "Warning",
      message: `Selesaikan Pembayaran sampai ${formattedDate}`,
      countdown: false,
    });
  };

  const handlePaymentComplete = () => {
    setCurrentStep("Selesai");
    setNotification({
      type: "Success",
      message: "Terima kasih, pembayaran Anda telah berhasil!",
      countdown: false,
    });
  };

  return (
    <div className="w-full">
      {/* Navbar */}
      <Navbar />
      {/* Information Bar */}
      <InformationBar
        currentStep={currentStep}
        notification={notification}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />
      {/* Step Content */}
      <div className="flex justify-center mt-6">
        <div className="w-[900px] p-4 border rounded-lg">
          {currentStep === "Isi Data" && (
            <div>
              <h2 className="font-semibold text-xl mb-4">Isi Data Diri</h2>
              <button
                onClick={handleSaveData}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Simpan Data
              </button>
            </div>
          )}

          {currentStep === "Bayar Review" && (
            <div>
              <h2 className="font-semibold text-xl mb-4">Review Data</h2>
              <button
                onClick={handleProceedToPayment}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
              >
                Lanjut Bayar
              </button>
            </div>
          )}

          {currentStep === "Bayar List" && (
            <div>
              <h2 className="font-semibold text-xl mb-4">
                Pilih Metode Pembayaran
              </h2>
              <ul className="list-disc pl-5 mb-4">
                <li>Transfer Bank</li>
                <li>e-Wallet</li>
                <li>Kartu Kredit</li>
              </ul>
              <button
                onClick={handlePaymentComplete}
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                Bayar Sekarang
              </button>
            </div>
          )}

          {currentStep === "Selesai" && (
            <div>
              <h2 className="font-semibold text-xl mb-4">
                Pembayaran Berhasil
              </h2>
              <p>Terima kasih atas pembayaran Anda!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
