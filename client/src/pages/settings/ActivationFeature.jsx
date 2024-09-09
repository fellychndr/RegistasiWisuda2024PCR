import Wrapper from "../../assets/wrappers/FormPage";
// import { Form } from "react-router-dom";
// import { FormRow } from "../../components";
import DataTable from "react-data-table-component";
import TabelContainer from "../../assets/wrappers/Tabel";
import { useEffect, useState } from "react";
import { getColumnsActivationFeatures } from "../../utils/columns";
import { checkDefaultTheme } from "../../components/Table";
import { getAllSettings } from "../../service/Settings.Service";
import { toast } from "react-toastify";

const ActivationFeatures = () => {
  const [setting, setSetting] = useState([]);

  const columns = getColumnsActivationFeatures();

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const data = await getAllSettings();
        console.log(data);
        
        setSetting(data);
      } catch (error) {
        toast.error("Gagal memuat data setting.");
      }
    };
    fetchSetting();
  }, []);

  return (
    <Wrapper>
      {/* <Form method="post" className="form" onSubmit={tambahMeja}> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4 className="form-title">Feature Setting</h4>
      </div>

      <div>
        <TabelContainer>
          <DataTable
            columns={columns}
            data={setting.data}
            title={"Semua Aktivasi Fitur"}
            pagination
            paginationServer
            fixedHeader
            theme={checkDefaultTheme()}
            highlightOnHover
          />
        </TabelContainer>
      </div>
      {/* </Form> */}
    </Wrapper>
  );
};
export default ActivationFeatures;
