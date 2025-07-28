import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, Keyboard } from 'lucide-react';

interface VoiceInputProps {
  onUserInput: (input: string) => void;
}

const VoiceInput = ({ onUserInput }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };
      
      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptResult = event.results[current][0].transcript;
        setTranscript(transcriptResult);
        
        if (event.results[current].isFinal) {
          onUserInput(transcriptResult);
          setTranscript('');
          setIsListening(false);
        }
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        setTranscript('');
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
      recognition.start();
    } else {
      // Fallback to text input if speech recognition isn't supported
      setShowTextInput(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setTranscript('');
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onUserInput(textInput.trim());
      setTextInput('');
      setShowTextInput(false);
    }
  };

  return (
    <div className="p-4 bg-background/80 backdrop-blur-sm border-t border-border">
      {showTextInput ? (
        <form onSubmit={handleTextSubmit} className="flex gap-3 items-center max-w-md mx-auto">
          <Input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Ask Stonks for alpha..."
            className="flex-1 bg-card border-border text-card-foreground placeholder:text-muted-foreground rounded-full py-3 px-4"
            autoFocus
          />
          <Button 
            type="submit" 
            disabled={!textInput.trim()}
            className="stonks-button min-w-[60px] h-12 rounded-full"
          >
            <Send size={18} />
          </Button>
          <Button 
            type="button"
            onClick={() => setShowTextInput(false)}
            variant="ghost"
            className="rounded-full p-3 h-12 w-12"
          >
            <Mic size={18} />
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          {/* Transcript display */}
          {transcript && (
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-3 w-full">
              <p className="text-sm text-muted-foreground text-center">
                {transcript}
              </p>
            </div>
          )}
          
          {/* Voice controls */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowTextInput(true)}
              variant="ghost"
              className="rounded-full p-3 h-12 w-12 hover:bg-muted/20"
            >
              <Keyboard size={18} />
            </Button>
            
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`
                relative min-w-[80px] h-16 rounded-full font-bold transition-all duration-300
                ${isListening 
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 animate-pulse' 
                  : 'stonks-button'
                }
              `}
            >
              {isListening ? (
                <>
                  <MicOff size={20} />
                  <span className="sr-only">Stop</span>
                </>
              ) : (
                <>
                  <Mic size={20} />
                  <span className="sr-only">Speak</span>
                </>
              )}
              
              {/* Listening indicator */}
              {isListening && (
                <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl animate-pulse"></div>
              )}
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            {isListening ? 'Listening... Tap to stop' : 'Tap to speak or ask for alpha'}
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;