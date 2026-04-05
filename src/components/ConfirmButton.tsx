"use client";

import { useState } from "react";
import { confirmOutage } from "@/lib/outages";

interface Props {
  outageId: string;
  confirmations: number;
}

export default function ConfirmButton({ outageId, confirmations }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await confirmOutage(outageId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleConfirm}
      disabled={loading}
      className="flex items-center gap-1 rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-600 disabled:opacity-50"
    >
      {loading ? "Confirming…" : `Confirm (${confirmations})`}
    </button>
  );
}
