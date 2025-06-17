
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Heart, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface JournalEntry {
  id: string;
  content: string;
  date: string;
  mood: number;
  emotions: string[];
  aiResponse?: string;
  timestamp: number;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
  emotions?: string[];
}

interface AIChatProps {
  entries: JournalEntry[];
  onCrisisDetected: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ entries, onCrisisDetected }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with a welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: "Hello! I'm your AI companion here to listen and support you. How are you feeling today? Feel free to share anything that's on your mind.",
        sender: 'ai',
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Crisis detection keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'better off dead', 'self harm'];
    const hasCrisisKeywords = crisisKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    if (hasCrisisKeywords) {
      onCrisisDetected();
      return "I'm really concerned about what you've shared. Your life has value and there are people who want to help. Please consider reaching out to a crisis helpline: 988 (Suicide & Crisis Lifeline) or text HOME to 741741. You don't have to go through this alone.";
    }

    // Simulate AI response based on sentiment
    const responses = {
      positive: [
        "I'm so glad to hear you're feeling positive! What's been contributing to this good mood?",
        "That sounds wonderful! It's great that you're experiencing these positive feelings.",
        "Your positive energy is really coming through. What would you like to explore about this feeling?"
      ],
      negative: [
        "I can hear that you're going through a difficult time. Thank you for sharing this with me - it takes courage to express these feelings.",
        "It sounds like things are really challenging right now. Remember that difficult feelings are temporary, and you're not alone in this.",
        "I'm here to listen and support you. Would you like to talk about what's making you feel this way?"
      ],
      neutral: [
        "Thank you for sharing that with me. How has your day been overall?",
        "I appreciate you opening up. What's been on your mind lately?",
        "That's interesting. Tell me more about what you're experiencing."
      ]
    };

    // Simple sentiment analysis
    const positiveWords = ['happy', 'good', 'great', 'wonderful', 'amazing', 'love', 'excited', 'grateful'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'hate', 'depressed', 'anxious', 'worried'];
    
    const words = userMessage.toLowerCase().split(' ');
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;

    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';

    const responseArray = responses[sentiment];
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(currentMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-xl border-0 bg-gradient-to-br from-blue-50/80 to-white backdrop-blur-sm">
      <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span>AI Companion</span>
        </CardTitle>
        <CardDescription className="text-blue-100">
          Your supportive AI companion for mental wellness
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                } animate-fade-in`}
              >
                <Avatar className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer">
                  <AvatarFallback className={message.sender === 'ai' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'}>
                    {message.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex-1 max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`p-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                      message.sender === 'ai'
                        ? 'bg-white border border-gray-200 hover:border-blue-300'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {format(new Date(message.timestamp), 'HH:mm')}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3 animate-fade-in">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm">
                  <div className="flex items-center space-x-1">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-sm text-gray-500">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-gray-50/50">
          <div className="flex space-x-2">
            <Input
              placeholder="Share your thoughts and feelings..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
              className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all cursor-text hover:border-gray-400"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center justify-center">
            <Heart className="w-3 h-3 mr-1 text-pink-500" />
            This AI provides support but isn't a replacement for professional help
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
