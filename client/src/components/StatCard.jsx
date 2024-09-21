import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatCard";

const StatCard = ({ data, label, link, color }) => {
  const navigate = useNavigate();
  return (
    <Wrapper color={color}>
      <header>
        <span className="unregist" onClick={() => navigate(link)}>
          {data?.UNREGISTERED || 0}
        </span>
        <span
          className="registed"
          onClick={() => navigate(`${link}&isRegis=true`)}
        >
          {data?.REGISTERED || 0}
        </span>
      </header>
      <h5>Data Mahasiswa {label}</h5>
    </Wrapper>
  );
};

export default StatCard;
