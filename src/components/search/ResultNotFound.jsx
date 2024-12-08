import React from "react";

const ResultNotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <img src="resultnotfound.png" alt="Pencarian tidak ditemukan" />
      </div>

      <h1 className="text-center font-medium text-black">
        <p>Maaf, pencarian anda tidak ditemukan</p>
        <span className="text-[#7126B5]">Silakan coba cari perjalanan lainnya!!</span>
      </h1>
    </div>
  );
};

export default ResultNotFound;
