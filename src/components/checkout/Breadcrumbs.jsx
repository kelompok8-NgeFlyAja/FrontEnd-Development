import React from "react";
const Breadcrumbs = ({ isPayment, isSuccess }) => {
  return (
    <div className="w-full flex justify-center px-2">
      <div className="py-5 text-lg mt-4 w-[936px] max-w-[936px]">
        <ul className="flex gap-2">
          <li className="font-bold"> Isi Data Diri </li>
          <li
            className={`${
              isPayment ? "font-bold" : "font-semibold text-slate-500"
            }`}
          >
            {" "}
            {">"} Bayar{" "}
          </li>
          <li
            className={`${
              isSuccess ? "font-bold" : "font-semibold text-slate-500"
            }`}
          >
            {" "}
            {">"} Selesai{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
