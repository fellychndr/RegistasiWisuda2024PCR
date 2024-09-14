import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { socketUrl } from "../config/config";
import { pusher } from "../utils/pusherUtils";

// const socket = io(socketUrl, {
//   reconnection: true,
// });

// client-side
// socket.on("connect", () => {
//   console.log(socket.id);
//   console.log(socket.connected);
//   console.log("-------------");
// });

const Display = () => {
  const [showDisplay, setShowDisplay] = useState(false);
  const [dataScan, setDataScan] = useState(null);
  const [registrasionGate, setRegistrasionGate] = useState(null);

  
  useEffect(() => {
    const registrastionGateId = localStorage.getItem("tableId");
    if (registrastionGateId) {
      setRegistrasionGate(registrastionGateId);
    }
    
    const channel = pusher.subscribe(registrastionGateId);
    channel.bind("my-event", (data) => {
      setDataScan(data);
      setShowDisplay(true);
      setTimeout(() => {
        setShowDisplay(false);
      }, 4000);

      console.log(data);
    });

    // const handleDisplay = (hasil) => {
    //   console.log(hasil);

    //   setDataScan(hasil);
    //   setShowDisplay(true);
    //   setTimeout(() => {
    //     setShowDisplay(false);
    //   }, 4000);
    // };

    // socket.on("display", handleDisplay);

    // return () => {
    //   socket.off("display", handleDisplay);
    // };
  }, [registrasionGate]);

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
