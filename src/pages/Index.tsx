import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Heart, MessageSquare, TrendingUp, Shield, Mic, MicOff, Phone, AlertTriangle, Sparkles, Brain, UserPlus } from 'lucide-react';
import { format, subDays, parseISO } from 'date-fns';
import MoodAnalyzer from '@/components/MoodAnalyzer';
import AIChat from '@/components/AIChat';
import VoiceInput from '@/components/VoiceInput';
import CrisisDetection from '@/components/CrisisDetection';
import EmergencyResources from '@/components/EmergencyResources';
import AuthPrompt from '@/components/AuthPrompt';
import AnonymousLimitations from '@/components/AnonymousLimitations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

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
      
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      newEntry.mood = Math.random() * 5 + 1;
      newEntry.emotions = ['reflective', 'hopeful'];
      newEntry.aiResponse = "Thank you for sharing your thoughts. I can sense there's a lot on your mind today. Remember that it's completely normal to feel this way, and you're taking a positive step by expressing these feelings. What would you like to explore further about this experience?";
      
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      generateMoodData(updatedEntries);
      
      if (!anonymousMode) {
        localStorage.setItem('mentalHealthEntries', JSON.stringify(updatedEntries));
      }
      
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

  const handleSignIn = () => {
    setIsSignedIn(true);
    setAnonymousMode(false);
    setUserName('User'); // This would be set from actual auth data
    localStorage.setItem('anonymousMode', JSON.stringify(false));
  };

  const toggleAnonymousMode = () => {
    if (anonymousMode) {
      setShowAuthDialog(true);
    } else {
      setIsSignedIn(false);
      setAnonymousMode(true);
      setUserName('');
      localStorage.removeItem('userName');
      localStorage.setItem('anonymousMode', JSON.stringify(true));
    }
  };

  const handleUserNameChange = (name: string) => {
    setUserName(name);
    if (!anonymousMode) {
      localStorage.setItem('userName', name);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const name = anonymousMode ? 'friend' : userName || 'there';
    return `${timeGreeting}, ${name}`;
  };

  const emotionColors = {
    happy: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer',
    sad: 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer',
    anxious: 'bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer',
    calm: 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer',
    reflective: 'bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer',
    hopeful: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer',
    frustrated: 'bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer',
    grateful: 'bg-pink-100 text-pink-800 hover:bg-pink-200 cursor-pointer'
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white via-purple-50/30 to-green-50"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-56 h-56 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating mental health symbols */}
        <div className="absolute top-1/4 left-1/4 opacity-5">
          <Heart className="w-32 h-32 text-blue-300 animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }} />
        </div>
        <div className="absolute top-3/4 right-1/4 opacity-5">
          <Brain className="w-28 h-28 text-green-300 animate-bounce" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-5">
          <Sparkles className="w-24 h-24 text-purple-300 animate-bounce" style={{ animationDelay: '4s', animationDuration: '7s' }} />
        </div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
      </div>

      {/* Header */}
      <Header
        anonymousMode={anonymousMode}
        userName={userName}
        onToggleAnonymousMode={toggleAnonymousMode}
        onUserNameChange={handleUserNameChange}
        onShowAuthDialog={() => setShowAuthDialog(true)}
      />

      {/* Crisis Alert */}
      {showCrisisAlert && (
        <Alert className="max-w-7xl mx-auto mt-4 mx-4 bg-red-50 border-red-200 animate-fade-in shadow-lg">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Crisis Support Available</AlertTitle>
          <AlertDescription className="text-red-700">
            If you're having thoughts of self-harm, please reach out for immediate help.
            <div className="mt-2 space-x-2">
              <Button 
                size="sm" 
                variant="destructive"
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                <Phone className="w-4 h-4 mr-1" />
                Crisis Hotline
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowCrisisAlert(false)}
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                I'm Safe
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-8 text-center relative">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
              {getGreeting()}
              <Brain className="w-10 h-10 ml-4 text-blue-500 animate-pulse" />
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-2xl blur-xl opacity-50"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            How are you feeling today? Your thoughts and emotions matter. Let's explore your mental wellness journey together.
          </p>
        </div>

        {/* Anonymous Mode Limitations */}
        {anonymousMode && (
          <div className="mb-6">
            <AnonymousLimitations onSignInClick={() => setShowAuthDialog(true)} />
          </div>
        )}

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 cursor-pointer bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-2xl p-2">
            <TabsTrigger 
              value="journal" 
              className="flex items-center space-x-2 cursor-pointer hover:bg-blue-50 transition-all duration-200 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Journal</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center space-x-2 cursor-pointer hover:bg-green-50 transition-all duration-200 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Heart className="w-4 h-4" />
              <span>AI Chat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="flex items-center space-x-2 cursor-pointer hover:bg-purple-50 transition-all duration-200 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
              disabled={anonymousMode}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Insights</span>
              {anonymousMode && <Shield className="w-3 h-3 text-amber-500" />}
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="flex items-center space-x-2 cursor-pointer hover:bg-red-50 transition-all duration-200 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Shield className="w-4 h-4" />
              <span>Resources</span>
            </TabsTrigger>
          </TabsList>

          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Daily Journal Entry</span>
                  <VoiceInput onVoiceInput={handleVoiceInput} />
                </CardTitle>
                <CardDescription>
                  Express your thoughts and feelings freely. Our AI will provide supportive feedback.
                  {anonymousMode && (
                    <span className="block mt-1 text-amber-600 text-sm">
                      ⚠️ Entries won't be saved in anonymous mode
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind today? How are you feeling?"
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  className="min-h-32 resize-none border-gray-200 focus:border-blue-400 cursor-text hover:border-gray-300 transition-colors"
                />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {currentEntry.length} characters
                  </span>
                  <Button 
                    onClick={handleSubmitEntry}
                    disabled={!currentEntry.trim() || isAnalyzing}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 hover:scale-105 transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Submit Entry'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Recent Entries</h3>
              {entries.length === 0 && (
                <Card className="border-gray-200 bg-gray-50">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">
                      {anonymousMode 
                        ? "No entries yet. Start journaling to see your thoughts here! Note: Entries won't be saved in anonymous mode."
                        : "No entries yet. Start journaling to see your thoughts here!"
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
              {entries.slice(0, 3).map((entry) => (
                <Card key={entry.id} className="shadow-md border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm text-gray-500">{entry.date}</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-colors cursor-pointer hover:scale-125 ${
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
                            className={emotionColors[emotion as keyof typeof emotionColors] || 'bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer'}
                          >
                            {emotion}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {entry.aiResponse && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3 hover:bg-blue-100 transition-colors cursor-pointer">
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
            {anonymousMode ? (
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-amber-800 mb-2">Insights Unavailable</h3>
                    <p className="text-amber-700 mb-4">
                      Sign in to unlock personalized mood tracking, trend analysis, and AI-powered insights about your mental wellness journey.
                    </p>
                    <Button 
                      onClick={() => setShowAuthDialog(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign In to View Insights
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Mood Trend Chart */}
                  <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
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
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="mood" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, cursor: 'pointer' }}
                            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, cursor: 'pointer' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Emotion Distribution */}
                  <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Emotion Patterns</CardTitle>
                      <CardDescription>Your most common emotional states</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(emotionColors).slice(0, 6).map(([emotion, colorClass]) => (
                          <div key={emotion} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0]}`} />
                              <span className="text-sm font-medium capitalize">{emotion}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2 cursor-pointer">
                                <div 
                                  className={`h-2 rounded-full ${colorClass.split(' ')[0]} transition-all hover:opacity-80`}
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
                <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Weekly Insights</CardTitle>
                    <CardDescription>AI-generated summary of your mental health journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer">
                        <h4 className="font-medium text-green-800 mb-2">🌱 Growth Areas</h4>
                        <p className="text-sm text-green-700">
                          You've shown increased self-reflection and mindfulness this week. Your entries indicate 
                          growing emotional awareness and positive coping strategies.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer">
                        <h4 className="font-medium text-blue-800 mb-2">💡 Recommendations</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Continue your morning journaling routine</li>
                          <li>• Try incorporating 5-minute breathing exercises</li>
                          <li>• Consider exploring gratitude practices</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors cursor-pointer">
                        <h4 className="font-medium text-purple-800 mb-2">🎯 Focus Areas</h4>
                        <p className="text-sm text-purple-700">
                          Work on stress management techniques and maintaining consistent sleep patterns 
                          to support your overall well-being.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <EmergencyResources />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <Footer />

      {/* Auth Dialog */}
      <AuthPrompt 
        onSignIn={handleSignIn}
        isOpen={showAuthDialog}
        onOpenChange={setShowAuthDialog}
      />
    </div>
  );
};

export default Index;
