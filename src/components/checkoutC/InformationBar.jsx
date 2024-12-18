import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const InformationBar = ({
  currentStep,
  notification,
  timeLeft,
  formatTime,
}) => {
  return (
    <div className="shadow-md pb-4">
      {/* Breadcrumb */}
      <div className="w-full flex justify-center px-2">
        <div className="py-5 text-lg w-[936px] max-w-[936px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <span
                  className={`${
                    currentStep.includes("Isi Data") ? "font-bold" : ""
                  }`}
                >
                  Isi Data Diri
                </span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span
                  className={`${
                    currentStep.includes("Bayar") ? "font-bold" : ""
                  }`}
                >
                  Bayar
                </span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={`${currentStep === "Selesai" ? "font-bold" : ""}`}
                >
                  Selesai
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Notification Bar */}
      <div className="flex justify-center px-3">
        <div
          className={`w-[900px] text-white h-12 rounded-lg flex items-center justify-center font-semibold ${
            notification.type === "Success"
              ? "bg-green-500"
              : notification.type === "Warning"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {notification.message}
          {notification.countdown && ` (${formatTime(timeLeft)})`}
        </div>
      </div>
    </div>
  );
};
