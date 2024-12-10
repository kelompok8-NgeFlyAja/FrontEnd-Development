<<<<<<< HEAD
import React from "react";

const ResultNotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <img src="resultnotfound.png" alt="Pencarian tidak ditemukan" />
=======
function ResultNotFound() {
  return (
    <div className="content max-w-full w-full relative flex flex-col items-center py-7">
      <img src="resultnotfound.png" alt="soldout" className="mb-4" />

      <div className="text-center">
        <p className="text-lg font-bold mb-1">
          Maaf, pencarian Anda tidak ditemukan
        </p>
        <p className="text-lg font-bold text-[#7126B5] pb-12">
          Coba cari perjalanan lainnya!
        </p>
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d
      </div>

      <h1 className="text-center font-medium text-black">
        <p>Maaf, pencarian anda tidak ditemukan</p>
        <span className="text-[#7126B5]">Silakan coba cari perjalanan lainnya!!</span>
      </h1>
    </div>
  );
};

export default ResultNotFound;
