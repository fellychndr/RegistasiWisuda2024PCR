import { FormRow, FormRowSelect, SubmitBtn } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JURUSAN, PRODI } from "../../../../utils/constants";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    // console.log(data);
    await customFetch.post("/mahasiswa", data);
    toast.success("Mahasiswa berhasil ditambahkan!");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const TambahMahasiswa = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Tambah Mahasiswa</h4>
        <div className="form-center">
          <FormRow labelText="NIM" type="text" name="nim" />
          <FormRow labelText="Nama" type="text" name="name" />
          <FormRow type="text" labelText="No Ijazah" name="noIjazah" />
          <FormRowSelect
            labelText="Jurusan"
            name="jurusan"
            defaultValue={JURUSAN.JTI}
            list={Object.values(JURUSAN)}
          />
          <FormRowSelect
            labelText="Prodi"
            name="prodi"
            defaultValue={PRODI.D4_TEKNIK_INFORMATIKA}
            list={Object.values(PRODI)}
          />
          <FormRow type="text" labelText="IPK" name="ipk" />
          <FormRow type="text" labelText="No Kursi" name="noKursi" />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default TambahMahasiswa;
