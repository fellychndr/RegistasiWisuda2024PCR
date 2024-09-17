import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (qrboxSize, props) => {
  let config = {
    qrbox: qrboxSize, // dynamic qrbox size based on resize
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props) => {
  const [qrboxSize, setQrboxSize] = useState(props.qrbox || 250);

  // Handle resize event
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Adjust qrbox size based on window width
      if (width < 600) {
        setQrboxSize(200); // smaller size for mobile screens
      } else if (width < 1024) {
        setQrboxSize(300); // medium size for tablets
      } else {
        setQrboxSize(400); // larger size for desktops
      }
    };

    // Initialize with current window size
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const config = createConfig(qrboxSize, props);
    const verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [qrboxSize, props]);

  return <div id={qrcodeRegionId} style={{ width: "100%" }} />;
};

export default Html5QrcodePlugin;
