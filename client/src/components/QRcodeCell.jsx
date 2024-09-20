import { useState } from "react";

const QRCodeCell = ({ row }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <div onClick={toggleModal}>
        <img src={row.qr_code} width={50} height={50} alt="QR Code" />
      </div>
      {isModalOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            //   backgroundColor: "rgba(1, 1, 1, 0.876)",
              padding: "20px",
              borderRadius: "8px",
              zIndex: 1000,
              color : "white",
              fontSize : "2rem",

            }}
          >
            {row.name}
          </div>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgb(0, 0, 0)",
              padding: "20px",
              borderRadius: "8px",
              zIndex: 1000,
            }}
            onClick={toggleModal}
          >
            <img
              src={row.qr_code}
              alt="QR Code"
              style={{ width: "300px", height: "300px" }}
            />
          </div>
        </>
      )}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.821)",
            zIndex: 999,
          }}
          onClick={toggleModal}
        />
      )}
    </>
  );
};

export default QRCodeCell;
