import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { doubleBarChart } from "@/data/chartsData";

const StatChart = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={doubleBarChart} width={730} height={250}>
        <CartesianGrid strokeDasharray="1 1" stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => {
            return new Intl.NumberFormat("en-US").format(value);
          }}
        />
        <Legend />
        <Bar dataKey="Orders_QTY" fill="#1e40af" />
        <Bar dataKey="Sales_USD" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatChart;
