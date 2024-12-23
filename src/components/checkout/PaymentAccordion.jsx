import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const PaymentAccordion = ({ handlePaymentComplete }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePayment = () => {
    if (selectedPaymentMethod === "gopay") {
      alert("Pembayaran menggunakan Gopay berhasil diproses!");
      handlePaymentComplete(); // Panggil fungsi dari prop
    } else if (selectedPaymentMethod === "virtual-account") {
      alert("Pembayaran menggunakan Virtual Account berhasil diproses!");
      handlePaymentComplete();
    } else if (selectedPaymentMethod === "credit-card") {
      alert("Pembayaran menggunakan Credit Card berhasil diproses!");
      handlePaymentComplete();
    } else {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-xl font-bold">Isi Data Pembayaran</div>
      {/* Accordion di bagian atas */}
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => setSelectedPaymentMethod(value)} // Update metode pembayaran yang dipilih
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
            <p className="text-gray-600 mb-4">
              Metode pembayaran menggunakan Virtual Account.
            </p>
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
                  placeholder="4480 0000 0000 0000"
                  className="w-full border rounded px-3 py-2 mt-1 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card holder name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border rounded px-3 py-2 mt-1 text-gray-700"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="000"
                    className="w-full border rounded px-3 py-2 mt-1 text-gray-700"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    placeholder="07/24"
                    className="w-full border rounded px-3 py-2 mt-1 text-gray-700"
                  />
                </div>
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Tombol Bayar Sekarang */}
      <div className="mt-6">
        <button
          onClick={handlePaymentComplete}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};
