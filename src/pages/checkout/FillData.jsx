import SeatSelection from "@/components/checkoutC/SeatSelection";
import { FlightDetail } from "@/components/checkoutC/FlightDetail";
import { BillingDetail } from "@/components/checkoutC/BillingDetail";

export const FillData = ({ handleSaveData }) => {
  return (
    <div className="flex justify-center items-center w-full py-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-[900px] w-full px-4">
        {/* Isi Data Pemesan */}
        <div className="flex-[2]">
          <BillingDetail />
          <SeatSelection />
          <button
            onClick={handleSaveData}
            className="bg-[#7126B5] text-white py-3 mt-4 px-4 rounded-lg w-full"
          >
            Simpan
          </button>
        </div>

        {/* Detail Penerbangan */}
        <div className="flex-[1]">
          <FlightDetail />
        </div>
      </div>
    </div>
  );
};
