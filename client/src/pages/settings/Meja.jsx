import Wrapper from "../../assets/wrappers/FormPage";
import { Form } from "react-router-dom";
import { FormRow } from "../../components";
import DataTable from "react-data-table-component";
import TabelContainer from "../../assets/wrappers/Tabel";
import { useEffect, useState } from "react";
import { getColumnsMejas } from "../../utils/columns";
import { checkDefaultTheme } from "../../components/Table";
import { createMeja, updateMeja, getAllMeja } from "../../service/Meja.service";
import { toast } from "react-toastify";

const Meja = () => {
  const [meja, setMeja] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [mejaValue, setMejaValue] = useState("");

  const fetchMeja = async () => {
    try {
      const data = await getAllMeja();
      setMeja(data);
    } catch (error) {
      toast.error("Gagal memuat data meja.");
    }
  };
  
  const columns = getColumnsMejas(
    setMejaValue,
    setIsEditing,
    setEditId,
    fetchMeja
  );

  useEffect(() => {
    fetchMeja();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (isEditing) {
        response = await updateMeja(editId, { name: mejaValue });
        if (response) {
          toast.success("Meja berhasil diupdate!");
          setIsEditing(false);
          setEditId(null);
        } else {
          toast.error("Gagal diupdate!");
        }
      } else {
        response = await createMeja({ name: mejaValue });
        if (response) {
          toast.success("Meja berhasil ditambahkan!");
          setIsEditing(false);
          setEditId(null);
        } else {
          toast.error("Gagal ditambahkan!");
        }
      }
      e.target.reset();
      fetchMeja();
      setMejaValue("");
    } catch (error) {
      toast.error("Gagal menyimpan meja.");
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="form-title">
            {isEditing ? "Edit Meja" : "Tambah Meja"}
          </h4>
        </div>

        <div className="form-center">
          <FormRow
            type="text"
            labelText="Meja"
            name="meja"
            defaultValue={mejaValue || ""}
            onChange={(e) => setMejaValue(e.target.value)}
          />
          <button type="submit" className="btn btn-block form-btn">
            {isEditing ? "Update" : "Submit"}
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
