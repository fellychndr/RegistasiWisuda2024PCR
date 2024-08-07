import { useState, useEffect } from "react";
import Html5QrcodePlugin from "../components/Html5QrcodePlugin.jsx";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import styled from "styled-components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.jsx";
import { Html5QrcodeScanner } from "html5-qrcode";
import Beep from "../assets/audio/beep.mp3";
import Fail from "../assets/audio/fail1.mp3";
import Yay from "../assets/audio/yay.mp3";
import { io } from "socket.io-client";

const socket = io("http://localhost:5101", {
  reconnection: true,
});

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0rem 1rem 1rem;

  .Result-container {
    min-width: 600px;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    padding: 0rem 2rem;
  }
  .Result-header {
    font-size: 16pt;
    margin-bottom: 20px;
  }
`;

export const LoadMahasiswa = async (id) => {
  try {
    const response = await customFetch.get(`/mahasiswa/${id}`);
    const mahasiswaData = response.data.mahasiswa;
    return mahasiswaData;
  } catch (error) {
    console.error("Gagal mengambil data mahasiswa:", error);
    toast.error(error.response.data.msg);
  }
};
export const cekRegistered = async (id) => {
  try {
    const response = await customFetch.get(`/mahasiswa/sudah/${id}`);
    const mahasiswaRegis = response.data.mahasiswa;
    return mahasiswaRegis;
  } catch (error) {
    console.error("Gagal mengambil data mahasiswa:", error);
    toast.error("QR tidak valid");
  }
};

export const Register = async (id) => {
  if (id) {
    try {
      const data = await customFetch.patch(`/mahasiswa/sudah/${id}`);
      toast.success("Berhasil Registrasi");
      socket.emit("display", data.data.mahasiswa);
      return data;
    } catch (error) {
      toast.error(error.response.data.msg);
      return error;
    }
  }
};

const Scan = () => {
  const [decodedResults, setDecodedResults] = useState(null);
  const [loadedMahasiswa, setLoadedMahasiswa] = useState(null);
  const [showMahasiswaData, setShowMahasiswaData] = useState(true);

  useEffect(() => {
    if (decodedResults) {
      cekRegistered(decodedResults).then((mhsRegis) => {
        if (mhsRegis.isRegis === true) {
          toast.error("Anda telah melakukan registrasi!");
          new Audio(Fail).play();
          console.log(mhsRegis.isRegis);
          return;
        } else {
          Register(decodedResults).then(() => {
            console.log("mhsRegis");
            LoadMahasiswa(decodedResults).then((mahasiswaData) => {
              setLoadedMahasiswa(mahasiswaData);
              setShowMahasiswaData(true);
              new Audio(Yay).play();
              setTimeout(() => {
                setShowMahasiswaData(false);
              }, 4000);
            });
          });
        }
      });
    }
  }, [decodedResults]);

  const onNewScanResult = (decodedText) => {
    // new Audio(Beep).play();
    setDecodedResults(decodedText);
    Html5QrcodeScanner.clear();
  };

  const displayRegistrasi = () => {
    const url = "http://localhost:5173/display";
    window.open(url, "_blank");
  };

  // useEffect(() => {
  //   // console.log("sockect io ", socket);
  //   socket.on("display", (disshow) => {});
  // }, []);

  return (
    <Wrapper>
      <div className="form">
        <div className="jarak" style={{marginBottom : "2rem"}}>
          <h5>Scan QR Code Anda</h5>
          <button className="btn btn-secondary" onClick={displayRegistrasi}>
            Display Registrasi
          </button>
        </div>
        <Container>
          <Html5QrcodePlugin
            fps={10}
            qrbox={300}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
          <div className="Result-container">
            <div className="Result-header">Hasil Scan QR Code</div>
            {showMahasiswaData && loadedMahasiswa && (
              <div className="Result-section">
                <br />
                <h5>Selamat Datang</h5>
                <h5>{loadedMahasiswa.name}</h5>
              </div>
            )}
          </div>
        </Container>
      </div>
    </Wrapper>
  );
};

export default Scan;
