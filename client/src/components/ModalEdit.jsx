import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Transparan */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

// Konten modal
const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 80%;
`;

// Tombol tutup modal
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

// Komponen modal utama
const ModalEdit = ({ onClose, children }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;asdfasdfasdf</CloseButton>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};
export default ModalEdit;
