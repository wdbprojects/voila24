import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts";
import { sampleBarChart } from "@/data/chartsData";

const StatChart = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={sampleBarChart}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            return `$${value}`;
          }}
        />

        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#1e40af]"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatChart;
