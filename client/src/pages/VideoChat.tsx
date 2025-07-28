import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoAvatar from '@/components/VideoAvatar';
import LiveCaptions from '@/components/LiveCaptions';
import VoiceInput from '@/components/VoiceInput';
import StonksControls from '@/components/StonksControls';
import { ArrowLeft } from 'lucide-react';
import { Message } from '@/types';

const VideoChat = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState<string>("Yo. I'm Stonks. Ready to get some alpha?");
  const [isOnline, setIsOnline] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lfgMode, setLfgMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const stonksResponses = [
    "Diamond hands only. Paper hands get rekt.",
    "Buy high, sell higher. This is the way.", 
    "The market is just numbers on a screen until you make it real.",
    "Risk management? I only manage gains.",
    "Every dip is a gift. Every peak is just the beginning.",
    "You think you know the market? The market knows you better.",
    "Patience, young padawan. Stonks take time.",
    "Emotions are expensive. Logic is profitable.",
    "Bulls make money, bears make money, but pigs get slaughtered.",
    "The best time to plant a tree was 20 years ago. The best time to buy stonks was yesterday."
  ];

  const loadingMessages = [
    "Calculating Alpha...",
    "Scanning market cope levels...",
    "Deploying advice with 2% conviction...",
    "Processing diamond hand certification...",
    "Analyzing your portfolio's emotional state..."
  ];

  const handleUserInput = (input: string) => {
    setIsLoading(true);
    const loadingMsg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setCurrentMessage(loadingMsg);
    
    // Simulate processing delay with loading message
    setTimeout(() => {
      setIsLoading(false);
      setIsSpeaking(true);
      const response = stonksResponses[Math.floor(Math.random() * stonksResponses.length)];
      setCurrentMessage(response);
      
      setTimeout(() => {
        setIsSpeaking(false);
      }, 1500);
    }, 1200);
  };

  const getDailyAlpha = () => {
    const alphaQuotes = [
      "In a world of paper hands, be the diamond hands.",
      "Fortune favors the bold. The market rewards the patient.",
      "Every bear market is just a sale on future wealth.",
      "Your portfolio is a reflection of your conviction.",
      "When others fear, legends accumulate."
    ];
    
    const quote = alphaQuotes[Math.floor(Math.random() * alphaQuotes.length)];
    setCurrentMessage(quote);
    setIsSpeaking(true);
    
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <button 
          className="bg-card/80 backdrop-blur-sm hover:bg-card/90 text-card-foreground border border-border rounded-full p-2 transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-neon-green' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-card-foreground">
            {isOnline ? 'Online • Ready to Drop Alpha' : 'Offline'}
          </span>
        </div>
        
        <button 
          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-full px-4 py-2 text-sm font-bold transition-colors"
          onClick={() => navigate('/')}
        >
          RAGE QUIT
        </button>
      </div>

      {/* Main Video Avatar */}
      <VideoAvatar isSpeaking={isSpeaking || isLoading} />
      
      {/* Live Captions */}
      <LiveCaptions message={currentMessage} isSpeaking={isSpeaking || isLoading} />
      
      {/* Controls */}
      <StonksControls 
        onDailyAlpha={getDailyAlpha}
        lfgMode={lfgMode}
        onToggleLfgMode={() => setLfgMode(!lfgMode)}
      />
      
      {/* Voice Input */}
      <VoiceInput onUserInput={handleUserInput} />
    </div>
  );
};

export default VideoChat;
