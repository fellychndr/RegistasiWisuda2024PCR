import Wrapper from "../../assets/wrappers/FormPage";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import FormTambahEdit from "../../components/FormTambahEdit";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    // console.log(data);
    await customFetch.post("/mahasiswa", data);
    toast.success("Mahasiswa berhasil ditambahkan!");
    return redirect("../");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const TambahMahasiswa = () => {
  // console.log(user);
  return (
    <Wrapper>
      <FormTambahEdit
        title="Data Mahasiswa"
        mahasiswa={""}
        action="Tambah"
        urlLink={"/mahasiswa/import"}
      />
    </Wrapper>
  );
};
export default TambahMahasiswa;
