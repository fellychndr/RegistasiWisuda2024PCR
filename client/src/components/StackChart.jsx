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
import { PRODII } from "../../../utils/constants";

const StackChart = () => {
  let data = [];
  const dataA = () => {
    PRODII.map((prodi) => {
      data.push({
        name: prodi.name,
        register : prodi.register,
        unregister : prodi.unregister
      });
    });
  };

  dataA();
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
          <Bar dataKey="register" stackId="a" fill="#82ca9d" />
          <Bar dataKey="unregister" stackId="a" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
      </Wrapper>
    </>
  );
};
export default StackChart;
