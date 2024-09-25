import Swal from "sweetalert2";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const confirm = async (id, navigate, url) => {
  Swal.fire({
    title: "Apakah Kamu Yakin?",
    text: "Data yang dihapus tidak dapat kembali!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await customFetch.delete(`/${url}/${id}`);
        navigate(`/dashboard/${url}`);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};

export default confirm;
