import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const Success = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const token = cookies.get("token");
  const bookingId = localStorage.getItem("bookingId");

  const handleIssueTicket = async () => {
    try {
      const response = await axios.get(
        `https://ngeflyaja.shop/download-pdf/${bookingId}`,
        {
          responseType: "blob", // Agar file diunduh sebagai PDF
          headers: {
            Authorization: `Bearer ${token}`, // Header Authorization
          },
        }
      );

      // Buat link untuk mengunduh file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Tiket-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      localStorage.removeItem("bookingId");
      localStorage.removeItem("bookingCode");
    } catch (error) {
      console.error("Gagal mengunduh tiket:", error);
      alert("Gagal mengunduh tiket. Silakan coba lagi.");
    }
  };

  const handleSearchOtherFlights = () => {
    navigate("/");
    localStorage.removeItem("bookingId");
    localStorage.removeItem("bookingCode");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 text-center space-y-6">
        {/* Ilustrasi */}
        <div className="w-40 h-40 mx-auto">
          <img
            src="/success-illustration.png"
            alt="Payment Success"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Pesan Sukses */}
        <h2 className="text-lg font-bold text-purple-600">Selamat!</h2>
        <p className="text-gray-700">Transaksi Pembayaran Tiket sukses!</p>

        {/* Tombol */}
        <div className="space-y-3">
          <button
            onClick={handleIssueTicket}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Terbitkan Tiket
          </button>
          <button
            onClick={handleSearchOtherFlights}
            className="w-full bg-purple-100 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-200 transition"
          >
            Cari Penerbangan Lain
          </button>
        </div>
      </div>
    </div>
  );
};
