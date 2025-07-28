import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DailyProvider } from "@daily-co/daily-react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import VideoBox from "../components/VideoBox";
import cn from "../utils/TailwindMergeAndClsx";
import IconSparkleLoader from "../media/IconSparkleLoader";
import DottedFace from "../media/dottedface.gif";
import { ArrowLeft, Brain, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import FaceScanner from "@/components/FaceScanner";

const SIMLI_API_KEY = import.meta.env.VITE_PUBLIC_SIMLI_API_KEY;

type StartSessionResponse = {
  roomUrl: string;
};

type SimliAgentProps = {
  onStart: () => void;
  onClose: () => void;
  faceId: Float32Array | null;
};

const SimliAgent: React.FC<SimliAgentProps> = ({
  onStart,
  onClose,
  faceId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [chatbotId, setChatbotId] = useState<string | null>(null);
  const myCallObjRef = useRef<DailyCall | null>(null);

  const handleJoinRoom = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.simli.ai/startE2ESession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: SIMLI_API_KEY,
          faceId: faceId?.toString() ?? "",
          voiceId: "",
          firstMessage: "",
          systemPrompt: "",
        }),
      });

      const data: StartSessionResponse = await response.json();
      const roomUrl = data.roomUrl;

      const newCallObject =
        DailyIframe.getCallInstance() ||
        DailyIframe.createCallObject({ videoSource: false });

      newCallObject.setUserName("User");
      await newCallObject.join({ url: roomUrl });

      myCallObjRef.current = newCallObject;
      setCallObject(newCallObject);
      loadChatbot();
    } catch (error) {
      console.error("Failed to join room:", error);
      setIsLoading(false);
    }
  };

  const loadChatbot = async () => {
    if (!myCallObjRef.current) return setTimeout(loadChatbot, 500);

    const participants = myCallObjRef.current.participants();
    const chatbot = Object.values(participants).find(
      (p: any) => p.user_name === "Chatbot"
    );

    if (chatbot) {
      setChatbotId(chatbot.session_id);
      setIsLoading(false);
      setIsAvatarVisible(true);
      onStart();
    } else {
      setTimeout(loadChatbot, 500);
    }
  };

  const handleLeaveRoom = async () => {
    if (callObject) {
      await callObject.leave();
      setCallObject(null);
      setIsAvatarVisible(false);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      {isAvatarVisible && (
        <div className="h-[350px] w-[350px]">
          <DailyProvider callObject={callObject}>
            {chatbotId && <VideoBox key={chatbotId} id={chatbotId} />}
          </DailyProvider>
        </div>
      )}

      <div className="flex flex-col items-center min-h-[100px]">
        {!isAvatarVisible ? (
          <button
            onClick={handleJoinRoom}
            disabled={isLoading}
            className={cn(
              "w-full h-[52px] mt-4 bg-green-500 text-white py-3 px-6 rounded-md transition-all duration-300",
              "hover:bg-white hover:text-green-600 flex justify-center items-center",
              isLoading && "pointer-events-none opacity-70"
            )}
          >
            {isLoading ? (
              <IconSparkleLoader className="animate-spin" />
            ) : (
              <span className="font-abc-repro-mono font-bold w-full text-center">
                GET ALPHA
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={handleLeaveRoom}
            className="mt-4 bg-red-600 text-white px-6 h-[52px] rounded-full hover:bg-white hover:text-red-600 transition-all duration-300"
          >
            Stop Interaction
          </button>
        )}
      </div>
    </>
  );
};

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);
  const [faceId, setFaceId] = useState<Float32Array | null>(null);

  const onStart = () => setShowDottedFace(false);
  const onClose = () => setShowDottedFace(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white  relative bg-black">
      <Link
        to="/"
        className="absolute top-6 left-4 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-all"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </Link>

      <div className="max-w-2xl flex flex-col items-center gap-6 bg-white/5 p-6 pb-[40px] rounded-xl w-full shadow-lg border border-white/10">
        {/* Header Section */}
        <div className="text-center animate-fade-in px-4 py-10">
          <h2 className="text-3xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            <span className="block">Talk to</span>
            <span className="inline-block text-green-400">Stonks</span> <br />
            <span className="text-white">Next-Gen AI</span>
          </h2>
        </div>

        {/* Face Image */}
        {showDottedFace && (
          <img
            src={DottedFace}
            alt="Dotted Face"
            className="mx-auto w-[300px]"
          />
        )}

        {/* Face Scanner (Uncomment when ready) */}
        {/* <FaceScanner onCapture={(id) => setFaceId(id)} /> */}

        <SimliAgent onStart={onStart} onClose={onClose} faceId={faceId} />

        {/* Features List */}
        <div className="space-y-6 pt-8 text-white w-full">
          <Feature
            icon={<TrendingUp className="h-5 w-5 text-green-400" />}
            title="Smart Market Analysis"
            description="Advanced algorithms analyze trends and patterns."
          />
          <Feature
            icon={<Brain className="h-5 w-5 text-blue-300" />}
            title="AI-Driven Insights"
            description="Intelligent risk evaluation and portfolio optimization."
          />
          <Feature
            icon={<Zap className="h-5 w-5 text-yellow-300" />}
            title="Real-Time Data"
            description="Live market data for instant decision making."
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Feature component
const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-center space-x-4">
    <div className="bg-white/10 p-2 rounded-lg">{icon}</div>
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </div>
);

export default Demo;
