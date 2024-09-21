import styled from 'styled-components';

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--background-secondary-color);
  border-bottom: 5px solid ${(props) => props.color};
  border-radius: var(--border-radius);
  position: relative;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 2rem;
    color: ${(props) => props.color};
    line-height: 2;
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: left;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  .icon {
    width: 3rem;
    height: 3rem;
    background: ${(props) => props.bcg};
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1.5rem;
      color: ${(props) => props.color};
    }
  }
  .detail {
    position: absolute; 
    bottom: 1rem;
    left: 50%; 
    transform: translateX(-50%); 
    margin-top: 1rem;
    padding: 0.5rem 1rem; 
    background-color: ${(props) => props.color};
    color: #fff;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: opacity 0.3s ease, transform 0.2s ease;


    opacity: 0;
    visibility: hidden;
    
    &:hover {
      background-color: ${(props) => props.bcg};
      color: ${(props) => props.color};
      opacity: 1; 
      visibility: visible; 
    }

    &:focus {
      outline: none;
    }
  }

  &:hover .detail {
    opacity: 1;
    visibility: visible;
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Gelapkan latar belakang */
  }
`;

export default Wrapper;
