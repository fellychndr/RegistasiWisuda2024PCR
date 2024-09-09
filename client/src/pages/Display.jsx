import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5101", {
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
  const [mahasiswa, setMahasiswa] = useState(null);
  const [currentTableId, setCurrentTableId] = useState(null);

  useEffect(() => {
    const storedTableId = localStorage.getItem("tableId");
    if (storedTableId) {
      socket.emit("register-table", storedTableId);
      setCurrentTableId(storedTableId);
    }

    const handleDisplay = (data) => {
      const { mahasiswa } = data;
      console.log("Received data:", mahasiswa);
      setMahasiswa(mahasiswa);
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

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Display Orang Tua</h1>
      <br />
      {showDisplay && mahasiswa && (
        <div>
          <h1>Selamat Datang</h1>
          <h1>{mahasiswa.name}</h1>
        </div>
      )}
    </div>
  );
};

export default Display;
