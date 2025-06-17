
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Heart } from 'lucide-react';

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
}

interface AIChatProps {
  entries: JournalEntry[];
  onCrisisDetected: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ entries, onCrisisDetected }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm here to support you on your mental wellness journey. Feel free to share anything that's on your mind, or ask me questions about coping strategies, mindfulness, or emotional well-being. How can I help you today?",
      sender: 'ai',
      timestamp: Date.now()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'no point', 'better off dead',
    'self harm', 'hurt myself', 'can\'t go on', 'giving up'
  ];

  const detectCrisis = (text: string): boolean => {
    const lowercaseText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowercaseText.includes(keyword));
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // This would normally call OpenAI GPT-4 API
    // For now, we'll provide contextual responses based on keywords and recent entries
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (detectCrisis(userMessage)) {
      setTimeout(() => onCrisisDetected(), 1000);
      return "I'm really concerned about what you've shared. Your life has value, and there are people who want to help. Please consider reaching out to a crisis helpline or emergency services. Would you like me to provide some immediate resources for support?";
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "I hear that you're feeling anxious. That's a very common experience, and you're not alone in feeling this way. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, and exhale for 8. This can help activate your body's relaxation response. What's been triggering your anxiety lately?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depression') || lowerMessage.includes('down')) {
      return "I'm sorry you're feeling down. It takes courage to acknowledge and express difficult emotions. Remember that feelings are temporary, even when they feel overwhelming. Have you been able to do any small activities that usually bring you comfort? Even tiny steps can make a difference.";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
      return "Feeling overwhelmed is your mind's way of telling you that there's a lot to process right now. Let's break things down into smaller, manageable pieces. What's the one thing that's weighing on you most heavily today? Sometimes naming our stressors can help reduce their power over us.";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
      return "Sleep is so important for mental health. Poor sleep can affect our mood, thinking, and emotional regulation. Have you been able to maintain a consistent sleep schedule? Creating a calming bedtime routine, avoiding screens before bed, and keeping your room cool and dark can help improve sleep quality.";
    }
    
    if (lowerMessage.includes('grateful') || lowerMessage.includes('thankful') || lowerMessage.includes('better')) {
      return "It's wonderful to hear positive feelings in your message! Gratitude is a powerful tool for mental wellness. When we acknowledge good moments, we're training our brain to notice more positive experiences. What's something small that brought you joy today?";
    }
    
    // Default empathetic responses
    const defaultResponses = [
      "Thank you for sharing that with me. It sounds like you have a lot on your mind. I'm here to listen and support you through whatever you're experiencing.",
      "I appreciate you opening up about your feelings. It's important to acknowledge and express what you're going through. How has your day been treating you?",
      "Your feelings are valid, and it's okay to experience whatever emotions you're having. Sometimes just talking about what's on our mind can help us process things better. What would be most helpful for you right now?",
      "I can sense there's something important you're working through. Remember that seeking support and expressing your thoughts shows strength, not weakness. What aspects of this situation feel most challenging?",
      "It takes courage to reach out and share your inner experiences. I'm honored that you're trusting me with your thoughts. Is there a particular area of your well-being you'd like to focus on today?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Generate AI response
    try {
      const aiResponse = await generateAIResponse(inputMessage);
      
      // Simulate typing delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: 'ai',
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <Card className="h-[600px] flex flex-col shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span>AI Mental Health Companion</span>
        </CardTitle>
        <CardDescription>
          I'm here to provide emotional support and coping strategies. This is not a replacement for professional therapy.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white ml-4'
                      : 'bg-gray-100 text-gray-800 mr-4'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && (
                      <Heart className="w-4 h-4 mt-0.5 text-pink-500 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User className="w-4 h-4 mt-0.5 text-blue-200 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <span className={`text-xs ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                      } mt-1 block`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-[80%] p-3 rounded-lg mr-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Share your thoughts or ask for support..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send. Remember: If you're in crisis, please seek immediate professional help.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
