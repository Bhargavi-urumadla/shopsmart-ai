import { motion } from "framer-motion";
import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  growth: string;
  color: string;
}

const StatCard = ({
  title,
  value,
  prefix = "",
  suffix = "",
  icon,
  growth,
  color,
}: StatCardProps) => {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="stat-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="stat-content">
        <p>{title}</p>

        <h2>
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </h2>

        <span>{growth}</span>
      </div>
    </motion.div>
  );
};

export default StatCard;