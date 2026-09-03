// Toast store (was inside components/Toast.tsx, imported by contexts —
// a context importing a component just for a function. UI stays in Toast.tsx).

export type ToastType = "success" | "error";

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
type Listener = (toasts: ToastMessage[]) => void;
const listeners = new Set<Listener>();
let toasts: ToastMessage[] = [];

export function showToast(message: string, type: ToastType = "success") {
  const id = ++toastId;
  toasts = [...toasts, { id, message, type }];
  listeners.forEach((l) => l(toasts));
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    listeners.forEach((l) => l(toasts));
  }, 3000);
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
