import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE, JURUSAN, PRODI } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/mahasiswa/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/mahasiswa");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/mahasiswa/${params.id}`, data);
    toast.success("Mahasiswa berhasil di edit");
    return redirect("/dashboard/mahasiswa");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditMahasiswa = () => {
  const { mahasiswa } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Data Mahasiswa</h4>
        <div className="form-center">
          <FormRow
            labelText="NIM"
            type="text"
            name="nim"
            defaultValue={mahasiswa.nim}
          />
          <FormRow
            labelText="Nama"
            type="text"
            name="name"
            defaultValue={mahasiswa.name}
          />
          <FormRow
            type="text"
            labelText="No Ijazah"
            name="noIjazah"
            defaultValue={mahasiswa.noIjazah}
          />
          <FormRowSelect
            labelText="Jurusan"
            name="jurusan"
            defaultValue={mahasiswa.jurusan}
            list={Object.values(JURUSAN)}
          />
          <FormRowSelect
            labelText="Prodi"
            name="prodi"
            defaultValue={mahasiswa.prodi}
            list={Object.values(PRODI)}
          />
          <FormRow
            type="text"
            labelText="IPK"
            name="ipk"
            defaultValue={mahasiswa.ipk}
          />
          <FormRow
            type="text"
            labelText="No Kursi"
            name="noKursi"
            defaultValue={mahasiswa.noKursi}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditMahasiswa;
