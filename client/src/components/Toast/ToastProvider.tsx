import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#FFFFFF",
          color: "#0F172A",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          padding: "14px 18px",
          fontSize: "15px",
          fontWeight: "500",
          boxShadow: "0 10px 30px rgba(0,0,0,.12)",
        },

        success: {
          iconTheme: {
            primary: "#22C55E",
            secondary: "#FFFFFF",
          },
        },

        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FFFFFF",
          },
        },
      }}
    />
  );
};

export default ToastProvider;