import toast from "react-hot-toast";

export const notify = {
  success: (message: string) =>
    toast.success(message, {
      duration: 3000,
    }),

  error: (message: string) =>
    toast.error(message, {
      duration: 4000,
    }),

  loading: (message: string) =>
    toast.loading(message),

  dismiss: (id?: string) =>
    toast.dismiss(id),
};