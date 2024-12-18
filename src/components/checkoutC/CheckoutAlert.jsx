import { useEffect, useState } from "react";

const CheckoutAlert = ({ type, message, countdown }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 menit dalam detik

  useEffect(() => {
    let timer;
    if (countdown) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Hitung jam
    const minutes = Math.floor((seconds % 3600) / 60); // Sisa menit
    const secs = seconds % 60; // Sisa detik

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="w-full flex justify-center px-3">
        <div
          className={`w-[900px] max-w-[900px] ${
            type === "Danger" ? "bg-[#FF0000]" : "bg-[#73CA5C]"
          } h-12 rounded-lg flex items-center justify-center text-white font-semibold relative`}
        >
          {countdown ? `${message} ${formatTime(timeLeft)}` : message}
        </div>
      </div>
    </>
  );
};

export default CheckoutAlert;
