import DataTable from "react-data-table-component";
import { useAllMahasiswaContext } from "../pages/mahasiswa/Mahasiswa";
import { useLocation, useNavigate } from "react-router-dom";
import TabelContainer from "../assets/wrappers/Tabel";
import { useDashboardContext } from "../pages/DashboardLayout";
import { Confirm } from "../components";
import { Registered } from "../components";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export const checkDefaultTheme = () => {
  const isDarkThemes = localStorage.getItem("darkTheme") === "true";
  return isDarkThemes === true ? "dark" : "default";
};

const TableMahasiswa = () => {
  const { isDarkTheme } = useDashboardContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const {
    data: { mahasiswas, totalMahasiswas },
  } = useAllMahasiswaContext();

  const columns = [
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

  const handlePageChange = (page) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", page);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handlePerRowsChange = (limit) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("limit", limit);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <TabelContainer>
      <DataTable
        columns={columns}
        data={mahasiswas}
        title="Seluruh Mahasiswa"
        pagination
        paginationServer
        paginationTotalRows={totalMahasiswas}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        fixedHeader
        theme={checkDefaultTheme()}
        highlightOnHover
        // actions={
        //   <button
        //     type="button"
        //     className="btn"
        //     style={{
        //       display: "flex",
        //       alignIttems: "center",
        //       justifyContent: "center",
        //     }}
        //   >
        //     <BiExport size={15} style={{ marginRight: "0.3rem" }} /> Export PDF
        //   </button>
        // }
      />
    </TabelContainer>
  );
};

export default TableMahasiswa;
