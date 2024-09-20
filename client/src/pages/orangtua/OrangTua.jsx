import { createContext, useContext } from "react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import TabelContainer from "../../assets/wrappers/Tabel";
import { LabelButton, SearchContainer, Table } from "../../components";

const AllOrangtuasContext = createContext();

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch.get("/orangtua", {
      params,
    });

    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const OrangTua = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllOrangtuasContext.Provider value={{ data, searchValues }}>
      {/* <Tab /> */}
      <TabelContainer>
        <LabelButton title={"Orang Tua"} linkUrl={"../orangtua/tambah-orangtua"}/>
        <SearchContainer context={searchValues}
          formTitle="Cari Orang Tua"/>
        <Table titleTable={"Seluruh Orang Tua"} context={data}/>
      </TabelContainer>
    </AllOrangtuasContext.Provider>
  );
};

export const useAllOrangtuaContext = () => useContext(AllOrangtuasContext);

export default OrangTua;
