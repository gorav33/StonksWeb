import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const dummyData = [
  { time: "10:00", vix: 21.3 },
  { time: "10:30", vix: 22.1 },
  { time: "11:00", vix: 23.0 },
  { time: "11:30", vix: 24.5 },
  { time: "12:00", vix: 23.8 },
  { time: "12:30", vix: 24.1 },
  { time: "13:00", vix: 24.6 },
];

export function VIXChart() {
  return (
    <div className="p-6 mt-6 bg-gray-900 rounded-xl">
      <h2 className="text-lg font-semibold text-white mb-4">VIX Index</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dummyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="vix"
            stroke="#22c55e"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
