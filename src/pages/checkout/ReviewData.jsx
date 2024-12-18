import React from "react";
import { Card } from "@/components/ui/card";

export const ReviewData = ({ handleProceedToPayment }) => {
  return (
    <Card className="p-6">
      <h2 className="font-semibold text-xl mb-4">Review Data</h2>
      <button
        onClick={handleProceedToPayment}
        className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
      >
        Lanjut Bayar
      </button>
    </Card>
  );
};
