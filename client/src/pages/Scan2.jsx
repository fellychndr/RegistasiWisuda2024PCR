import { QrCodeScanner, Stop } from "@mui/icons-material";
import { Fab } from "@mui/material";
import QrScanner from "qr-scanner";
import { useState, useEffect } from "react";

let stopScan = false;
let hasilScan = "";

const Scann = () => {
  const [btnScan, setBtnScan] = useState(true);
  const [scanResult, setScanResult] = useState();

  useEffect(() => {
    scanNow(true); // Panggil scanNow dengan parameter true saat komponen dipasang (mounted)
  }, [scanResult]); // Tambahkan array kosong sebagai dependensi untuk memastikan efek hanya dijalankan sekali

  const scanNow = async (isScan) => {
    setBtnScan(isScan);
    if (isScan) stopScan = true;
    if (!isScan) return;
    stopScan = false;
    await new Promise((r) => setTimeout(r, 100));
    const videoElement = document.getElementById("scanView");
    const scanner = new QrScanner(
      videoElement,
      (result) => {
        hasilScan = result.data;
        setScanResult(result.data);
        setBtnScan(true);
        stopScan = true;
      },
      {
        onDecodeError: (error) => {
          console.error(error);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      }
    );
    await scanner.start();
    while (stopScan === false) await new Promise((r) => setTimeout(r, 100));
    scanner.stop();
    scanner.destroy();
  };
  console.log(scanResult);

  return (
    <>
      <video
        id="scanView"
        style={{
          width: "90%",
          height: "90%",
          borderStyle: "dotted",
        }}
      ></video>

      <h5>
        Hasil Scan:
        <br />
        {hasilScan}
      </h5>

      <Fab
        color={btnScan ? "primary" : "secondary"}
        onClick={() => scanNow(!btnScan)}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        {<QrCodeScanner />}
        {btnScan === false && <Stop />}
      </Fab>
    </>
  );
};

export default Scann;
