import Wrapper from "../../assets/wrappers/FormPage";
import { Form } from "react-router-dom";
import { FormRow } from "../../components";
import DataTable from "react-data-table-component";
import TabelContainer from "../../assets/wrappers/Tabel";
import { useEffect, useState } from "react";
import { getColumnsSettings } from "../../utils/columns";
import { checkDefaultTheme } from "../../components/Table";
import { createMeja, getAllMeja } from "../../service/Meja.service";
import { toast } from "react-toastify";


const Meja = () => {
  const [meja, setMeja] = useState([]);

  const columns = getColumnsSettings();

  useEffect(() => {
    const fetchMeja = async () => {
      try {
        const data = await getAllMeja();
        setMeja(data);
      } catch (error) {
        toast.error("Gagal memuat data meja.");
      }
    };
    fetchMeja();
  }, []);

  const tambahMeja = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mejaValue = formData.get("meja");
    try {
      const data = { name: mejaValue };
      await createMeja(data);
      const updatedLoket = await getAllMeja();
      setMeja(updatedLoket.data || []);
      toast.success("Loket berhasil ditambahkan!");
      e.target.reset();
    } catch (error) {
      toast.error("Gagal menambahkan meja.");
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" onSubmit={tambahMeja}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="form-title">Meja Scan</h4>
        </div>

        <div className="form-center">
          <FormRow
            type="text"
            labelText="Meja"
            name="meja"
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
          >
            Submit
          </button>
        </div>

        <div>
          <TabelContainer>
            <DataTable
              columns={columns}
              data={meja.data}
              title={"Semua Meja Scan"}
              pagination
              paginationServer
              paginationTotalRows={meja.total}
              fixedHeader
              theme={checkDefaultTheme()}
              highlightOnHover
            />
          </TabelContainer>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Meja;
