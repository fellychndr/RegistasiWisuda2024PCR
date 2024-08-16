import Swal from "sweetalert2";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const registered = async (linkUrl , navigate, url) => {
  Swal.fire({
    title: "Apakah Kamu Yakin?",
    text: "Mahasiswa Akan di Registrasi.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Registrasikan!",
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customFetch.patch(linkUrl);
          navigate(`/dashboard/${url}`);
        } catch (error) {
          toast.error(error?.response?.data?.msg);
        }

        Swal.fire({
          title: "Registered!",
          text: "Mahasiswa berhasil registrasi.",
          icon: "success",
        });
      }
    })
};

export default registered;
