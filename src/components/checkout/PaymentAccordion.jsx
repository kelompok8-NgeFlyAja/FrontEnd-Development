import React, { useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Cookies from "universal-cookie";

export const PaymentAccordion = ({
  handlePaymentComplete,
  bankDetails,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [creditCardData, setCreditCardData] = useState({
    card_number: "",
    card_exp_month: "",
    card_exp_year: "",
    card_cvv: "",
  });

  const cookies = new Cookies();
  const token = cookies.get("token");

  const bookingId = localStorage.getItem("bookingId");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (selectedPaymentMethod === "gopay") {
      alert("Pembayaran menggunakan Gopay berhasil diproses!");
      handlePaymentComplete();
    } else if (selectedPaymentMethod === "virtual-account") {
      alert("Pembayaran menggunakan Virtual Account berhasil diproses!");
      handlePaymentComplete();
    } else if (selectedPaymentMethod === "credit-card") {
      try {
        const response = await axios.post(
          `https://ngeflyaja.shop/payment-creditcard/${bookingId}`,
          creditCardData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Pembayaran dengan Credit Card berhasil!");
        handlePaymentComplete();
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Terjadi kesalahan pada pembayaran";
        alert(`Pembayaran gagal: ${errorMessage}`);
      }
    } else {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="text-xl font-bold text-gray-800 mb-4">
        Isi Data Pembayaran
      </div>
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => setSelectedPaymentMethod(value)}
      >
        {/* Gopay Section */}
        <AccordionItem value="gopay">
          <AccordionTrigger className="trigger">Gopay</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600 mb-4">
              Metode pembayaran menggunakan Gopay.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Virtual Account Section */}
        <AccordionItem value="virtual-account">
          <AccordionTrigger className="trigger">
            Virtual Account
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {bankDetails.map((bank, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {bank.bank.toUpperCase()}
                  </h3>
                  {bank.vaCode && (
                    <p className="text-sm text-gray-500 mb-1">
                      <strong>Kode VA:</strong> {bank.vaCode}
                    </p>
                  )}
                  <p className="text-sm text-gray-700">
                    <strong>Nomor VA:</strong> {bank.vaNumber}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Credit Card Section */}
        <AccordionItem value="credit-card">
          <AccordionTrigger className="trigger">Credit Card</AccordionTrigger>
          <AccordionContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card number
                </label>
                <input
                  type="text"
                  name="card_number"
                  value={creditCardData.card_number}
                  onChange={handleInputChange}
                  placeholder="4480 0000 0000 0000"
                  className="w-full border rounded px-3 py-2 mt-1 text-gray-700 focus:ring focus:ring-green-300"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Month
                  </label>
                  <input
                    type="text"
                    name="card_exp_month"
                    value={creditCardData.card_exp_month}
                    onChange={handleInputChange}
                    placeholder="07"
                    className="w-full border rounded px-3 py-2 mt-1 text-gray-700 focus:ring focus:ring-green-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Year
                  </label>
                  <input
                    type="text"
                    name="card_exp_year"
                    value={creditCardData.card_exp_year}
                    onChange={handleInputChange}
                    placeholder="2025"
                    className="w-full border rounded px-3 py-2 mt-1 text-gray-700 focus:ring focus:ring-green-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="card_cvv"
                  value={creditCardData.card_cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full border rounded px-3 py-2 mt-1 text-gray-700 focus:ring focus:ring-green-300"
                />
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6">
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};
