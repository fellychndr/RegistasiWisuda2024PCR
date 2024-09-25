import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  background: var(--background-secondary-color);
  padding: 1.5rem 0 0 2rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  h5 {
    font-weight: 700;
  }
  .tabs-container {
    display: flex;
    padding-top: 1.5rem;
  }

  .tabs {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
    position: relative;
  }

  .tab {
    color: #7f8c9f;
    font-weight: 600;
    padding: 10px 0px;
    margin-right: 10px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: border-bottom-color 0.3s ease-in-out;
  }

  .tab.active {
    color: #004b5f;
    border-bottom-color: #004b5f;
  }

  .tab:not(.active):hover {
    color: #004b5f;
  }

  .tab-content {
    margin-top: 20px;
  }

  .tab-pane {
    display: none;
  }

  .tab-pane.active {
    display: block;
  }

  .tab-slider {
    position: absolute;
    bottom: 0;
    height: 2px;
    background-color: #004b5f;
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
    left: 0;
    width: 0;
  }

  @media (max-width: 768px) {
    padding: 0;
    h5 {
      display: none;
    }
    .tabs-container {
      padding-top: 0;
    }
    .tabs {
      width: 100%;
      text-align: center;
      gap: 0;
    }
    .tab {
      height: 100%;
      width: 100%;
      border-radius: 10px;
      margin-right: 0;
      z-index: 1;
    }
    .tab.active {
      color: white;
      border-bottom-color: transparent;
    }
    .tab-slider {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: #004b5f;
      z-index: 0;
    }
  }
`;
export default Wrapper;
