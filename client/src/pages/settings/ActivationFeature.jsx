import Wrapper from "../../assets/wrappers/FormPage";
import DataTable from "react-data-table-component";
import TabelContainer from "../../assets/wrappers/Tabel";
import { useEffect, useState } from "react";
import { getColumnsActivationFeatures } from "../../utils/columns";
import { checkDefaultTheme } from "../../components/Table";
import { createSetting, getAllSettings } from "../../service/Settings.Service";
import { toast } from "react-toastify";
import { FormRow } from "../../components";
import { Form, useNavigate } from "react-router-dom";

const ActivationFeatures = () => {
  const [setting, setSetting] = useState([]);
  const navigate = useNavigate();
  const columns = getColumnsActivationFeatures(navigate);

  const fetchSetting = async () => {
    let featureNames = {};
    try {
      const data = await getAllSettings();
      setSetting(data);
      data.data.map((setting) => {
        featureNames[setting.featureName] = setting.isEnabled;
      });
    } catch (error) {
      toast.error("Gagal memuat data setting.");
    }
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  const tambahFeature = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fiturValue = formData.get("fitur");
    const data = { featureName: fiturValue };
    console.log(data);

    try {
      await createSetting(data);
      toast.success("Fitur berhasil ditambahkan!");
      e.target.reset();
      fetchSetting();
    } catch (error) {
      toast.error("Gagal menambahkan feature.");
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form" onSubmit={tambahFeature}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="form-title">Fitur</h4>
        </div>

        <div className="form-center">
          <FormRow type="text" labelText="Fitur" name="fitur" />
          <button type="submit" className="btn btn-block form-btn">
            Submit
          </button>
        </div>
      </Form>
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
    </Wrapper>
  );
};
export default ActivationFeatures;
