import Swal from "sweetalert2";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const Konsumsied = async (linkUrl, navigate, url) => {
  Swal.fire({
    title: "Apakah Kamu Yakin?",
    text: "Kosumsi Akan di Ambil.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Ambilkan!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await customFetch.patch(linkUrl);
        navigate(`/dashboard/${url}`);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }

      Swal.fire({
        title: "Diambil!",
        text: "Orang tua mengambil kosumsi.",
        icon: "success",
      });
    }
  });
};

export default Konsumsied;
