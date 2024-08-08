import { useLoaderData } from "react-router-dom";
import { StatsContainer } from "../components";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const response = await customFetch.get("/mahasiswa/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Beranda = () => {
  const { defaultStats } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
    </>
  );
};

export default Beranda;
