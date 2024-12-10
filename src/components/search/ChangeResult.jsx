import { useNavigate } from "react-router-dom";

const ChangeResult = () => {
  const flightDetails = {
    from: "JKT",
    to: "MLB",
    passengers: 2,
    seatClass: "Economy",
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h2 className="font-bold text-lg mb-4 py-4">Pilih Penerbangan</h2>
      <div className="flex justify-between items-center">
        {/* Informasi Penerbangan */}
        <div className="flex-grow flex items-center bg-[#A06ECE] text-white px-4 py-3 rounded-lg mr-2 ml-7">
          <span className="material-icons mr-2">
            <button className="flex items-center justify-center mr-2" onClick={() => navigate("/")}>
              <img src="icons/fi_arrow-left.svg" alt="back" />
            </button>
          </span>
          <span>
            {flightDetails.from} &gt; {flightDetails.to} - {flightDetails.passengers} Penumpang - {flightDetails.seatClass}
          </span>
        </div>

        {/* Tombol Ubah Pencarian */}
        <button className="bg-[#73CA5C] text-white px-12 py-3 rounded-lg font-medium mr-7" onClick={() => navigate("/")}>
          Ubah Pencarian
        </button>
      </div>
    </div>
  );
};

export default ChangeResult;
