import { saveAs } from "file-saver";
import React, { useEffect, useRef, useState } from "react";
import { getFaceDescriptor } from "../utils/faceUtil";

interface Props {
  onCapture: (faceId: Float32Array, imageUrl: string) => void;
}

const FaceScanner: React.FC<Props> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  const handleCapture = async () => {
    console.log("Capturing face...");
    if (!videoRef.current) return;

    const descriptor = await getFaceDescriptor(videoRef.current);
    if (!descriptor) {
      alert("Face not detected");
      return;
    }
    console.log(descriptor);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
    }

    const dataUrl = canvas.toDataURL("image/jpeg");
    setCapturedImageUrl(dataUrl);
    onCapture(descriptor, dataUrl);
  };

  const handleDownload = () => {
    if (capturedImageUrl) {
      saveAs(capturedImageUrl, "captured-face.jpg");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        width={300}
        className="rounded border"
      />

      <button
        onClick={handleCapture}
        className="bg-green-500 text-white px-4 py-2 rounded shadow"
      >
        Capture Face
      </button>

      {capturedImageUrl && (
        <>
          <img
            src={capturedImageUrl}
            alt="Captured"
            className="rounded w-48 border"
          />
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Download Image
          </button>
        </>
      )}
    </div>
  );
};

export default FaceScanner;
