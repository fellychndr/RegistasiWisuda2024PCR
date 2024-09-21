import styled from "styled-components";
const Wrapper = styled.article`
  padding: 2rem;
  background: var(--background-secondary-color);
  border-bottom: 5px solid ${(props) => props.color};
  border-radius: var(--border-radius);
  position: relative;
  transition: background-color 0.3s ease;

  header {
    display: flex;
    align-items: center;
    justify-content: between;
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
  }
  .unregist {
    color: #d66a6a;
    background-color: #ffeeee;
    padding: 1rem 0;
    width: 100%;
  }
  .registed {
    color: #1d955d;
    background-color: #daf2e7;
    padding: 1rem 0;
    width: 100%;
  }

  h5 {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 0rem;
    font-size: 1rem;
  }
`;

export default Wrapper;
