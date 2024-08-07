import { toast } from "react-toastify";
import {
  SearchContainer,
  TableMahasiswa,
  // Tab,
  LabelButton,
} from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

const AllMahasiswasContext = createContext();

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch.get("/mahasiswa", {
      params,
    });

    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};
const Mahasiswa = () => {
  const { data, searchValues } = useLoaderData();
  // console.log(data.qrcode);
  return (
    <AllMahasiswasContext.Provider value={{ data, searchValues }}>
      {/* <Tab /> */}
      <LabelButton />
      <SearchContainer />
      <TableMahasiswa />
    </AllMahasiswasContext.Provider>
  );
};
export const useAllMahasiswaContext = () => useContext(AllMahasiswasContext);
export default Mahasiswa;
