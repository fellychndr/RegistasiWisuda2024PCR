import { FaPlus } from "react-icons/fa";
// import { LuImport } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem 1rem;
  border-radius: 5px;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LabelButton = ({ title, linkUrl }) => {
  const { search, pathname } = useLocation();

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const isRegis = searchParams.get("isRegis") === "true";

  const handleTabClick = () => {
    searchParams.set("isRegis", isRegis ? "false" : "true");
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Container>
      <h5>Tabel {title}</h5>
      <div className="sejajar">
        <button className="btn sejajar" onClick={() => handleTabClick()}>
          {isRegis ? <IoArrowBackOutline /> : <FaCheck size={15} />}
          {isRegis ? "Kembali" : `Lihat Registrasi ${title}`}
        </button>
        {/* <button className="btn sejajar" style={{ margin: "0rem 1rem 0rem" }}>
          <LuImport size={15} />
          Import Data Mahasiswa
        </button> */}
        <button
          type="button"
          className="btn sejajar"
          onClick={() => navigate(linkUrl)}
        >
          <FaPlus size={13} />
          Tambah {title}
        </button>
      </div>
    </Container>
  );
};
export default LabelButton;
