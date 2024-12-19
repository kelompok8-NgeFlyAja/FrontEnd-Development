import React from "react";
import { Card } from "@/components/ui/card";

export const Success = () => {
  return (
    <Card className="p-6">
      <h2 className="font-semibold text-xl mb-4">Pembayaran Berhasil</h2>
      <p>Terima kasih atas pembayaran Anda!</p>
    </Card>
  );
};
