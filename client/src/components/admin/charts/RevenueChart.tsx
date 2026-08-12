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

interface MonthlySales {
  month: string;
  revenue: number;
  orders: number;
}

interface RevenueChartProps {
  data: MonthlySales[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
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
        <AreaChart data={data}>
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

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => {
              const revenueValue =
                typeof value === "number"
                  ? value
                  : Number(value ?? 0);

              return [
                `₹${Number.isNaN(revenueValue) ? 0 : revenueValue.toLocaleString()}`,
                "Revenue",
              ];
            }}
            contentStyle={{
              background: "#111827",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

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