import React, { useEffect, useState } from "react";
import { loadModels } from "../utils/faceUtil";
import FaceScanner from "../components/FaceScanner";
import MatchResult from "../components/MatchResult";
import * as faceapi from "face-api.js";

const AI_MODELS = [
  { name: "Model 1", url: "/ai-faces/model1.jpg" },
  { name: "Model 2", url: "/ai-faces/model2.jpg" },
];

const FaceMatcherPage: React.FC = () => {
  const [realImage, setRealImage] = useState("");
  const [matchedImage, setMatchedImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadModels().catch((err) => console.error("Model loading failed:", err));
  }, []);

  const handleFaceCapture = async (
    descriptor: Float32Array,
    imageUrl: string
  ) => {
    setRealImage(imageUrl);
    setLoading(true);
    let bestMatch = { url: "", distance: 1 };

    for (const model of AI_MODELS) {
      try {
        const img = await faceapi.fetchImage(model.url);
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) continue;

        const distance = faceapi.euclideanDistance(
          descriptor,
          detection.descriptor
        );

        if (distance < bestMatch.distance) {
          bestMatch = { url: model.url, distance };
        }
      } catch (err) {
        console.error(`Error processing model ${model.name}:`, err);
      }
    }

    setMatchedImage(bestMatch.url);
    setLoading(false);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">AI Face Match</h1>
      <FaceScanner onCapture={handleFaceCapture} />
      {loading && (
        <p className="text-green-300 mt-4">Matching in progress...</p>
      )}
      {realImage && matchedImage && !loading && (
        <MatchResult realImage={realImage} matchedAiImage={matchedImage} />
      )}
    </div>
  );
};

export default FaceMatcherPage;
