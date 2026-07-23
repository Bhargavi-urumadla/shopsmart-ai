import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "./RevenueChart.css";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 26000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 34000 },
  { month: "Jun", revenue: 41000 },
  { month: "Jul", revenue: 52000 },
];

const RevenueChart = () => {
  return (
    <div className="revenue-card">

      <div className="chart-header">

        <div>
          <h2>Revenue Analytics</h2>
          <p>Monthly revenue overview</p>
        </div>

        <select>
          <option>Last 7 Months</option>
          <option>Last Year</option>
        </select>

      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={revenueData}>

          <defs>

            <linearGradient
              id="colorRevenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#14b8a6"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;