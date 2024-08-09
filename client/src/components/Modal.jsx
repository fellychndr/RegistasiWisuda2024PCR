import styled, { keyframes } from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
// Keyframes for the modal opening animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: var(--background-secondary-color);
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Make sure the CloseButton is positioned relative to this container */
`;

// Update the CloseButton styles
const CloseButton = styled.button`
  background: #842029;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  transform: translate(
    50%,
    -50%
  ); /* Adjust to keep the button within the modal */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  :hover {
    color: var(--red-dark);
    background: var(--red-light);
  }
`;

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}><IoCloseSharp size={18}/></CloseButton>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
