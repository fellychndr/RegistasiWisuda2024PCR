import styled from "styled-components";

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  background: var(--background-secondary-color);

  .tab-button {
    background-color: var(---background-secondary-color);
    text-align: center;
    color: var(--text-color);
    border: 1px solid var(--primary-500);
    padding: 10px 20px;
    cursor: pointer;
    outline: none;
    width: 100%;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
      background-color: var(--primary-500);
      color: var(--white);
    }
  }
  .tab-active{
    background-color: var(--primary-500);
      color: var(--white);
  }
`;

export default TabWrapper;
