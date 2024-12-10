<<<<<<< HEAD
import React from "react";

const SoldOut = () => {
  return (
    <div className="flex flex-col items-center gap-5 min-h-[50vh]">
      <div>
        <img src="soldout.png" alt="Tiket Habis" />
=======
function SoldOut() {
  return (
    <div className="content max-w-full w-full mx-auto relative flex flex-col items-center py-7">
      <img src="soldout.png" alt="soldout" className="w-1/3 mb-4" />

      <div className="text-center">
        <p className="text-lg font-bold mb-1">Maaf, tiket terjual habis!</p>
        <p className="text-lg font-bold text-[#7126B5] pb-12">
          Coba cari perjalanan lainnya!
        </p>
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d
      </div>
      <h1 className="text-center font-medium text-black">
        <p>Maaf, tiket terjual habis!</p>
        <span className="text-[#7126B5]"> Coba cari perjalanan lainnya!</span>
      </h1>
    </div>
  );
};

export default SoldOut;
