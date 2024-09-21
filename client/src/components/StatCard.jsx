import Wrapper from "../assets/wrappers/StatCard";

const StatCard = ({ data, label, color }) => {
  return (
    <Wrapper color={color}>
      <header>
        <span className="unregist">{data?.UNREGISTERED || 0}</span>
        <span className="registed">{data?.REGISTERED || 0}</span>
      </header>
      <h5>Data Mahasiswa {label}</h5>
    </Wrapper>
  );
};

export default StatCard;
