import React from "react";
import { BillingDetail } from "@/components/checkoutC/BillingDetail";
import SeatSelection from "@/components/checkoutC/SeatSelection";
import { FlightDetail } from "@/components/checkoutC/FlightDetail";

export const ReviewData = ({ handleProceedToPayment }) => {
  return (
    <div className="flex justify-center items-center w-full py-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-[900px] w-full px-4">
        {/* Isi Data Pemesan */}
        <div className="flex-[2]">
          <BillingDetail />
          <SeatSelection />
          <button
            className="bg-[#D0D0D0] text-white py-3 mt-4 px-4 rounded-lg w-full"
            disabled
          >
            Simpan
          </button>
        </div>

        {/* Detail Penerbangan */}
        <div className="flex-[1]">
          <FlightDetail />
          <button
            onClick={handleProceedToPayment}
            className="bg-[#FF0000] text-white py-3 mt-4 px-4 rounded-lg w-full"
          >
            Lanjut Bayar
          </button>
        </div>
      </div>
    </div>
  );
};
