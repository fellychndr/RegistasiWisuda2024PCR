import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, title, icon, color, bcg, link }) => {
  const navigate = useNavigate()
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
      <button className="detail" onClick={() => navigate(link)}>
        Lihat Detail
      </button>
    </Wrapper>
  );
};

export default StatItem;
