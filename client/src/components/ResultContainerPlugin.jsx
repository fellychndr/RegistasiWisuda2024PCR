import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/mahasiswa/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/mahasiswa");
  }
};
export const action = async ({ id }) => {
  console.log(id);
  // try {
  //   await customFetch.patch(`/mahasiswa/sudah/${id}`);
  //   toast.success("Berhasil Registrasi");
  //   return redirect("/dashboard/mahasiswa");
  // } catch (error) {
  //   toast.error(error.response.data.msg);
  //   return error;
  // }
};

const ResultContainerPlugin = (props) => {
  
  console.log(props.results);
  return (
    <div className="Result-container">
      <div className="Result-header">Hasil Scan QR Code</div>
      <div className="Result-section">{props.results}</div>
    </div>
  );
};

export default ResultContainerPlugin;
