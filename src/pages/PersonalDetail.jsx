import CheckoutAlert from "@/components/checkout/CheckoutAlert";
import { useEffect, useState } from "react";

const PersonalDetail = ({ setPage }) => {
  const [countdown, setCountdown] = useState(15 * 60); // 15 menit dalam detik

  // Timer countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) clearInterval(timer);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <CheckoutAlert
        type="Success"
        message="Data Anda berhasil tersimpan!"
        countdown={formatTime(countdown)}
      />
      <div className="p-4">
        {/* Form Isi Data */}
        <h2>Isi Data Diri</h2>
        <form>
          {/* Input Form */}
          <button
            type="button"
            onClick={() => setPage("Bayar")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Lanjut Bayar
          </button>
        </form>
      </div>
    </>
  );
};

export default PersonalDetail;
