// src/config/columnsConfig.js

import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { Registered, Confirm } from "../components";

export const getMahasiswaColumns = (navigate) => [
  {
    name: "No.",
    selector: (row) => row.number,
    width: "3.4rem",
  },
  {
    name: "NIM",
    selector: (row) => row.nim,
    sortable: true,
    width: "6.4rem",
  },
  {
    name: "Nama",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "No Ijazah",
    selector: (row) => row.noIjazah,
    sortable: true,
    width: "9rem",
  },
  {
    name: "Jurusan",
    selector: (row) => row.jurusan,
    sortable: true,
    width: "6rem",
  },
  {
    name: "Prodi",
    selector: (row) => row.prodi,
    sortable: true,
  },
  {
    name: "No Kursi",
    selector: (row) => row.noKursi,
    sortable: true,
    width: "5.9rem",
  },
  {
    name: "QR",
    cell: (row) => <img src={row.qr_code} width={50} height={50} />,
    sortable: true,
    width: "5.5rem",
  },
  {
    name: "Status",
    cell: (row) =>
      row.isRegis ? (
        <button
          className="btn regis-btn"
          onClick={() => Registered(row._id, navigate)}
        >
          <FaCheckCircle size={15} />
        </button>
      ) : (
        <div
          className="btn unregis-btn"
          onClick={() => Registered(row._id, navigate)}
        >
          <IoCloseCircle size={17} />
        </div>
      ),
    width: "5rem",
  },
  {
    name: "Action",
    cell: (row) => (
      <div>
        <button
          className="btn warning-btn"
          style={{ marginRight: "10px" }}
          onClick={() => navigate(`../mahasiswa/edit-mahasiswa/${row._id}`)}
        >
          Edit
        </button>
        <button
          className="btn danger-btn"
          onClick={() => Confirm(row._id, navigate)}
        >
          Hapus
        </button>
      </div>
    ),
  },
];
