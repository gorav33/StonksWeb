import React from "react";

interface Props {
  realImage: string;
  matchedAiImage: string;
}

const MatchResult: React.FC<Props> = ({ realImage, matchedAiImage }) => {
  const downloadImage = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8 px-4">
      {/* Real Image */}
      <div className="text-center">
        <h4 className="font-semibold mb-2 text-lg">Your Face</h4>
        {realImage ? (
          <>
            <img
              src={realImage}
              alt="Captured user face"
              className="rounded shadow-md w-48 h-auto object-cover transition-all duration-300"
            />
            <button
              onClick={() => downloadImage(realImage, "your-face.jpg")}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Download
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-500">No image available</p>
        )}
      </div>

      {/* AI Matched Image */}
      <div className="text-center">
        <h4 className="font-semibold mb-2 text-lg">AI Matched Face</h4>
        {matchedAiImage ? (
          <>
            <img
              src={matchedAiImage}
              alt="AI matched face"
              className="rounded shadow-md w-48 h-auto object-cover transition-all duration-300"
            />
            <button
              onClick={() =>
                downloadImage(matchedAiImage, "ai-matched-face.jpg")
              }
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Download
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-500">No match found</p>
        )}
      </div>
    </div>
  );
};

export default MatchResult;
