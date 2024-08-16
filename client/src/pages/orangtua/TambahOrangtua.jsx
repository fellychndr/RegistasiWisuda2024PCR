import Wrapper from "../../assets/wrappers/FormPage";
import { redirect, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import FormTambahEdit from "../../components/FormTambahEdit";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/orangtua", data);
    toast.success("Orangtua berhasil ditambahkan!");
    return redirect("../");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const TambahOrangtua = () => {
  const { user } = useOutletContext();
  // console.log(user);
  return (
    <Wrapper>
      <FormTambahEdit
        title="Data Orangtua"
        mahasiswa={""}
        urlLink={"/orangtua/import"}
      />
    </Wrapper>
  );
};
export default TambahOrangtua;
