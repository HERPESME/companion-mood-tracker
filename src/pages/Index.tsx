
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Heart, MessageSquare, TrendingUp, Shield, Mic, MicOff, Phone, AlertTriangle } from 'lucide-react';
import { format, subDays, parseISO } from 'date-fns';
import MoodAnalyzer from '@/components/MoodAnalyzer';
import AIChatbot from '@/components/AIChat';
import VoiceInput from '@/components/VoiceInput';
import CrisisDetection from '@/components/CrisisDetection';
import EmergencyResources from '@/components/EmergencyResources';

interface JournalEntry {
  id: string;
  content: string;
  date: string;
  mood: number;
  emotions: string[];
  aiResponse?: string;
  timestamp: number;
}

interface MoodData {
  date: string;
  mood: number;
  emotions: string[];
}

const Index = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('journal');
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [userName, setUserName] = useState('');
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [moodData, setMoodData] = useState<MoodData[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('mentalHealthEntries');
    const savedAnonymousMode = localStorage.getItem('anonymousMode');
    const savedUserName = localStorage.getItem('userName');
    
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      setEntries(parsedEntries);
      generateMoodData(parsedEntries);
    }
    
    if (savedAnonymousMode) {
      setAnonymousMode(JSON.parse(savedAnonymousMode));
    }
    
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  // Generate mood tracking data
  const generateMoodData = (entriesData: JournalEntry[]) => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), i);
      const dayEntries = entriesData.filter(entry => 
        format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      
      const avgMood = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayEntries.length
        : 0;
      
      const allEmotions = dayEntries.flatMap(entry => entry.emotions);
      
      return {
        date: format(date, 'MMM dd'),
        mood: Math.round(avgMood * 10) / 10,
        emotions: [...new Set(allEmotions)]
      };
    }).reverse();
    
    setMoodData(last30Days);
  };

  const handleSubmitEntry = async () => {
    if (!currentEntry.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: currentEntry,
        date: format(new Date(), 'PPP'),
        mood: 0,
        emotions: [],
        timestamp: Date.now()
      };
      
      // This would normally call the AI services
      // For now, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      newEntry.mood = Math.random() * 5 + 1; // Random mood for demo
      newEntry.emotions = ['reflective', 'hopeful']; // Demo emotions
      newEntry.aiResponse = "Thank you for sharing your thoughts. I can sense there's a lot on your mind today. Remember that it's completely normal to feel this way, and you're taking a positive step by expressing these feelings. What would you like to explore further about this experience?";
      
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      generateMoodData(updatedEntries);
      
      // Save to localStorage
      localStorage.setItem('mentalHealthEntries', JSON.stringify(updatedEntries));
      
      setCurrentEntry('');
      setActiveTab('chat');
    } catch (error) {
      console.error('Error analyzing entry:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    setCurrentEntry(text);
  };

  const toggleAnonymousMode = () => {
    const newMode = !anonymousMode;
    setAnonymousMode(newMode);
    localStorage.setItem('anonymousMode', JSON.stringify(newMode));
    
    if (newMode) {
      setUserName('');
      localStorage.removeItem('userName');
    }
  };

  const handleUserNameChange = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const name = anonymousMode ? 'friend' : userName || 'there';
    return `${timeGreeting}, ${name}`;
  };

  const emotionColors = {
    happy: 'bg-yellow-100 text-yellow-800',
    sad: 'bg-blue-100 text-blue-800',
    anxious: 'bg-red-100 text-red-800',
    calm: 'bg-green-100 text-green-800',
    reflective: 'bg-purple-100 text-purple-800',
    hopeful: 'bg-emerald-100 text-emerald-800',
    frustrated: 'bg-orange-100 text-orange-800',
    grateful: 'bg-pink-100 text-pink-800'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MindfulJourney</h1>
                <p className="text-sm text-gray-600">AI-Powered Mental Wellness</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {anonymousMode ? 'Anonymous Mode' : 'Personal Mode'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAnonymousMode}
                  className="text-xs"
                >
                  {anonymousMode ? 'Sign In' : 'Go Anonymous'}
                </Button>
              </div>
              
              {!anonymousMode && (
                <Input
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => handleUserNameChange(e.target.value)}
                  className="w-32 h-8 text-sm"
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Crisis Alert */}
      {showCrisisAlert && (
        <Alert className="max-w-7xl mx-auto mt-4 mx-4 bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Crisis Support Available</AlertTitle>
          <AlertDescription className="text-red-700">
            If you're having thoughts of self-harm, please reach out for immediate help.
            <div className="mt-2 space-x-2">
              <Button size="sm" variant="destructive">
                <Phone className="w-4 h-4 mr-1" />
                Crisis Hotline
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowCrisisAlert(false)}>
                I'm Safe
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{getGreeting()}</h2>
          <p className="text-gray-600">How are you feeling today? Your thoughts and emotions matter.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="journal" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Journal</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Resources</span>
            </TabsTrigger>
          </TabsList>

          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Daily Journal Entry</span>
                  <VoiceInput onVoiceInput={handleVoiceInput} />
                </CardTitle>
                <CardDescription>
                  Express your thoughts and feelings freely. Our AI will provide supportive feedback.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind today? How are you feeling?"
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  className="min-h-32 resize-none border-gray-200 focus:border-blue-400"
                />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {currentEntry.length} characters
                  </span>
                  <Button 
                    onClick={handleSubmitEntry}
                    disabled={!currentEntry.trim() || isAnalyzing}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Submit Entry'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Recent Entries</h3>
              {entries.slice(0, 3).map((entry) => (
                <Card key={entry.id} className="shadow-md border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm text-gray-500">{entry.date}</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < entry.mood ? 'bg-green-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {entry.mood.toFixed(1)}/5
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3 line-clamp-3">{entry.content}</p>
                    
                    {entry.emotions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {entry.emotions.map((emotion, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className={emotionColors[emotion as keyof typeof emotionColors] || 'bg-gray-100 text-gray-800'}
                          >
                            {emotion}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {entry.aiResponse && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                        <p className="text-sm text-blue-800 font-medium mb-1">AI Reflection:</p>
                        <p className="text-sm text-blue-700">{entry.aiResponse}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat">
            <AIChat entries={entries} onCrisisDetected={() => setShowCrisisAlert(true)} />
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mood Trend Chart */}
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Mood Trends (30 Days)</CardTitle>
                  <CardDescription>Track your emotional well-being over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                      <YAxis domain={[0, 5]} stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Emotion Distribution */}
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Emotion Patterns</CardTitle>
                  <CardDescription>Your most common emotional states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(emotionColors).slice(0, 6).map(([emotion, colorClass]) => (
                      <div key={emotion} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0]}`} />
                          <span className="text-sm font-medium capitalize">{emotion}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${colorClass.split(' ')[0]}`}
                              style={{ width: `${Math.random() * 80 + 20}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">
                            {Math.floor(Math.random() * 40 + 10)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Summary */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Weekly Insights</CardTitle>
                <CardDescription>AI-generated summary of your mental health journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">🌱 Growth Areas</h4>
                    <p className="text-sm text-green-700">
                      You've shown increased self-reflection and mindfulness this week. Your entries indicate 
                      growing emotional awareness and positive coping strategies.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">💡 Recommendations</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Continue your morning journaling routine</li>
                      <li>• Try incorporating 5-minute breathing exercises</li>
                      <li>• Consider exploring gratitude practices</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 mb-2">🎯 Focus Areas</h4>
                    <p className="text-sm text-purple-700">
                      Work on stress management techniques and maintaining consistent sleep patterns 
                      to support your overall well-being.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <EmergencyResources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
