import { Form, redirect } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import SubmitBtn from "./SubmitBtn";
import { JURUSAN, PRODI } from "../../../utils/constants";
import { LuImport } from "react-icons/lu";
import Modal from "./Modal";
import { useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const FormTambahEdit = ({ title, mahasiswa, urlLink }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await customFetch.post(urlLink, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        closeModal();
        toast.success(`Berhasil Import ${title}`);
      } catch (error) {
        toast.error(error?.response?.data?.msg || "Gagal mengimpor data");
      }
    } else {
      toast.error("Please pilih sebuah file untuk  diimport.");
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Form method="post" className="form" onSubmit={handleSubmit}>
          <h6 className="form-title">Import {title}</h6>
          <div className="form-center">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ margin: "1rem 0" }}
            />
            <SubmitBtn formBtn>Upload</SubmitBtn>
          </div>
        </Form>
      </Modal>
      <Form method="post" className="form">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="form-title">Tambah {title}</h4>
          {title === "Data Mahasiswa" || title === "Data Orangtua" ? (
            <button
              onClick={openModal}
              type="button"
              className="btn sejajar"
              style={{ marginBottom: "2rem" }}
            >
              <LuImport size={15} />
              Import {title}
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="form-center">
          {title !== "Data Orangtua" ? (
            <>
              <FormRow
                labelText="NIM"
                type="text"
                name="nim"
                defaultValue={mahasiswa.nim}
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
              <FormRow
                type="text"
                labelText="IPK"
                name="ipk"
                defaultValue={mahasiswa.ipk}
              />
            </>
          ) : (
            ""
          )}
          <FormRow
            labelText="Nama"
            type="text"
            name="name"
            defaultValue={mahasiswa.name}
          />

          <FormRowSelect
            labelText="Prodi"
            name="prodi"
            defaultValue={mahasiswa.prodi}
            list={Object.values(PRODI)}
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
    </>
  );
};
export default FormTambahEdit;
