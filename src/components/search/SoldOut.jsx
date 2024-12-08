import React from "react";

const SoldOut = () => {
  return (
    <div className="flex flex-col items-center gap-5 min-h-[50vh]">
      <div>
        <img src="soldout.png" alt="Tiket Habis" />
      </div>
      <h1 className="text-center font-medium text-black">
        <p>Maaf, tiket terjual habis!</p>
        <span className="text-[#7126B5]"> Coba cari perjalanan lainnya!</span>
      </h1>
    </div>
  );
};

export default SoldOut;
