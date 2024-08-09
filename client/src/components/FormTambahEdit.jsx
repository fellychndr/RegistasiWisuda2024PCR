import { Form } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import SubmitBtn from "./SubmitBtn";
import { JURUSAN, PRODI } from "../../../utils/constants";
import { LuImport } from "react-icons/lu";
import Modal from "./Modal";
import { useState } from "react";

const FormTambahEdit = ({ title, mahasiswa }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      closeModal();
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Form method="post" className="form" onSubmit={handleSubmit}>
          <h6 className="form-title">Import Data Mahasiswa</h6>
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
          <h4 className="form-title">{title}</h4>
          {title === "Tambah Mahasiswa" || title === "Tambah Orangtua" ? (
            <button
              onClick={openModal}
              type="button"
              className="btn sejajar"
              style={{ marginBottom: "2rem" }}
            >
              <LuImport size={15} />
              Import Data Mahasiswa
            </button>
          ) : (
            ""
          )}
        </div>
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
    </>
  );
};
export default FormTambahEdit;
