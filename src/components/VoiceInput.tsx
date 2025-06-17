
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Square } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onVoiceInput }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          onVoiceInput(finalTranscript);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        if (event.error === 'not-allowed') {
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone access to use voice input.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Voice Recognition Error",
            description: "There was an error with voice recognition. Please try again.",
            variant: "destructive"
          });
        }
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, [onVoiceInput]);

  const startRecording = async () => {
    if (!isSupported || !recognitionRef.current) {
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice input. Please try Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsRecording(true);
      recognitionRef.current.start();
      
      toast({
        title: "Voice Recording Started",
        description: "Speak naturally, and your words will be transcribed.",
      });
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsRecording(false);
      
      toast({
        title: "Recording Error",
        description: "Could not start voice recording. Please try again.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Voice Recording Stopped",
        description: "Your speech has been processed.",
      });
    }
  };

  if (!isSupported) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="opacity-50"
      >
        <MicOff className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant={isRecording ? "destructive" : "outline"}
      size="sm"
      onClick={isRecording ? stopRecording : startRecording}
      className={isRecording ? "animate-pulse" : ""}
    >
      {isRecording ? (
        <>
          <Square className="w-4 h-4 mr-1" />
          Stop
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 mr-1" />
          Voice
        </>
      )}
    </Button>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    speechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default VoiceInput;
