import React from "react";
import { Card } from "@/components/ui/card";

export const PaymentList = ({ handlePaymentComplete }) => {
  return (
    <Card className="p-6">
      <h2 className="font-semibold text-xl mb-4">Pilih Metode Pembayaran</h2>
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
    </Card>
  );
};
