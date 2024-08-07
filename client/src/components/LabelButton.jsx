import { FaPlus } from "react-icons/fa";
import { LuImport } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem 1rem;
  border-radius: 5px;
`;

const LabelButton = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);

  const handleTabClick = (pathName) => {
    // console.log(pathName);
    searchParams.set("isRegis", pathName);
    navigate(`${pathname}?${searchParams.toString()}`); // Perbarui URL dengan parameter yang sesuai
  };

  return (
    <Container>
      <h5>Tabel Mahasiswa</h5>
      <div className="sejajar" >
        <button
          className="btn sejajar"
          onClick={() => handleTabClick("true")} // Ubah argumen yang diteruskan ke handleTabClick sesuai kebutuhan
        >
          <FaCheck size={15} style={{ marginRight: "0.3rem" }} />
          Lihat Registrasi Mahasiswa
        </button>
        {/* <button className="btn sejajar" style={{ margin: "0rem 1rem 0rem" }}>
          <LuImport size={15} style={{ marginRight: "0.3rem" }} />
          Import Data Mahasiswa
        </button> */}
        <button
          type="button"
          className="btn sejajar"
          onClick={() => navigate("../mahasiswa/tambah-mahasiswa")}
          style={{ margin: "0rem 1rem 0rem" }}
        >
          <FaPlus size={13} style={{ marginRight: "0.3rem" }} />
          Tambah Mahasiswa
        </button>
      </div>
    </Container>
  );
};
export default LabelButton;
