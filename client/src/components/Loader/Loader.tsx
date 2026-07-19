import { HashLoader, ClipLoader } from "react-spinners";
import "./Loader.css";

interface LoaderProps {
  text?: string;
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
}

const Loader = ({
  text = "Loading...",
  size = "medium",
  fullScreen = false,
}: LoaderProps) => {
  // ================================
  // SMALL LOADER
  // ================================

  if (size === "small") {
    return (
      <div
        className="small-loader"
        role="status"
        aria-live="polite"
      >
        <ClipLoader
          color="#14B8A6"
          size={18}
          speedMultiplier={0.9}
        />

        {text && (
          <span className="small-loader-text">
            {text}
          </span>
        )}
      </div>
    );
  }

  // ================================
  // MEDIUM / LARGE LOADER
  // ================================

  const spinnerSize = size === "large" ? 70 : 52;

  return (
    <div
      className={`
        global-loader
        global-loader--${size}
        ${fullScreen ? "global-loader--fullscreen" : ""}
      `}
      role="status"
      aria-live="polite"
    >
      <div className="loader-content">

        {/* Background Glow */}

        <div className="loader-glow" />

        {/* Spinner */}

        <div className="loader-spinner">

          <HashLoader
            color="#14B8A6"
            size={spinnerSize}
            speedMultiplier={0.9}
          />

          <div className="loader-ai-icon">
            ✨
          </div>

        </div>

        {/* ShopSmart AI Branding */}

        <div className="loader-brand">

          <span className="loader-brand-main">
            ShopSmart
          </span>

          <span className="loader-brand-ai">
            AI
          </span>

        </div>

        {/* Loading Message */}

        <p className="loader-text">
          {text}
        </p>

        {/* Animated Dots */}

        <div
          className="loader-dots"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>

      </div>
    </div>
  );
};

export default Loader;