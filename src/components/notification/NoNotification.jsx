import React from "react";

const NoNotification = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <img src="resultnotfound.png" alt="Pencarian tidak ditemukan" />
      </div>

      <h1 className="text-center font-medium text-black">
        <p>Maaf, tidak ada notifikasi terbaru</p>
      </h1>
    </div>
  );
};

export default NoNotification;
