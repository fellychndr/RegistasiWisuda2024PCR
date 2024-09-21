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
import Wrapper from "../assets/wrappers/StatItem";

const StackChart = ({data}) => {

  return (
    <>
      <Wrapper>
        <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="unregistered" name="Belum Registrasi" stackId="a" fill="#ea7777" />
          <Bar dataKey="registered" name="Sudah Registrasi" stackId="a" fill="#41bc82" />
        </BarChart>
        </ResponsiveContainer>
      </Wrapper>
    </>
  );
};
export default StackChart;
