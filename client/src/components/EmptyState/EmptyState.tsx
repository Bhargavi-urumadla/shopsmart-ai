import { Link } from "react-router-dom";
import "./EmptyState.css";

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
}

function EmptyState({
  icon,
  title,
  message,
  buttonText = "Explore Products",
  buttonLink = "/products",
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      <Link
        to={buttonLink}
        className="empty-state-button"
      >
        🛍️ {buttonText}
      </Link>
    </div>
  );
}

export default EmptyState;