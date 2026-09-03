"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { subscribeToasts, type ToastMessage } from "../lib/toast";

export default function ToastContainer() {
  const [items, setItems] = useState<ToastMessage[]>([]);

  useEffect(() => subscribeToasts((t) => setItems([...t])), []);

  if (items.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {items.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.type === "success"
            ? <CheckCircle size={16} aria-hidden="true" />
            : <AlertCircle size={16} aria-hidden="true" />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
