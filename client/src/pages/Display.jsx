import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socketUrl } from "../config/config";

const socket = io(socketUrl, {
  reconnection: true,
});

// client-side
// socket.on("connect", () => {
//   console.log(socket.id);
//   console.log(socket.connected);
//   console.log("-------------");
// });

const Display = () => {
  const [showDisplay, setShowDisplay] = useState(false);
  const [dataScan, setDataScan] = useState(null);
  const [currentTableId, setCurrentTableId] = useState(null);

  useEffect(() => {
    const storedTableId = localStorage.getItem("tableId");
    if (storedTableId) {
      socket.emit("register-table", storedTableId);
      setCurrentTableId(storedTableId);
    }

    const handleDisplay = (hasil) => {
      console.log(hasil);
      
      setDataScan(hasil);
      setShowDisplay(true);
      setTimeout(() => {
        setShowDisplay(false);
      }, 4000);
    };

    socket.on("display", handleDisplay);

    return () => {
      socket.off("display", handleDisplay);
    };
  }, [currentTableId]);

  // console.log(dataScan);

  return (
    <div style={{ textAlign: "center" }}>
      {/* <h1>Display </h1> */}
      <br />
      {showDisplay && dataScan && (
        <div>
          <h1>Selamat Datang {dataScan.message}</h1>
          <h1>{dataScan.data.name}</h1>
        </div>
      )}
    </div>
  );
};

export default Display;
