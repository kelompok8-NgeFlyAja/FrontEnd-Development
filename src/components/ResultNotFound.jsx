import React from "react";

function ResultNotFound() {
  return (
    <div className="content max-w-full w-full relative flex flex-col items-center py-7">
      <img src="resultnotfound.png" alt="soldout" className="mb-4" />

      <div className="text-center">
        <p className="text-lg font-bold mb-1">Maaf, pencarian Anda tidak ditemukan</p>
        <p className="text-lg font-bold text-[#7126B5] pb-12">Coba cari perjalanan lainnya!</p>
      </div>
    </div>
  );
}

export default ResultNotFound;
