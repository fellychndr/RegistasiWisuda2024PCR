import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5101", {
  reconnection: true,
});

const Display = () => {
  const [showDisplay, setShowDisplay] = useState(true);
  const [mahasiswa, setMahasiswa] = useState(null);

  useEffect(() => {
    socket.on("display", (display) => {
      setMahasiswa(display);
      setShowDisplay(true);
      setTimeout(() => {
        setMahasiswa(false);
      }, 4000);
    });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Display Mahasiswa</h1>
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
