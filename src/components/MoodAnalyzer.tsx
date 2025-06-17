
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MoodAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  emotions: string[];
  intensity: number;
  keywords: string[];
}

interface MoodAnalyzerProps {
  text: string;
  onAnalysisComplete: (analysis: MoodAnalysis) => void;
}

const MoodAnalyzer: React.FC<MoodAnalyzerProps> = ({ text, onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async (inputText: string): Promise<MoodAnalysis> => {
    // This is a simplified sentiment analysis
    // In production, this would use @huggingface/transformers
    
    const positiveWords = ['happy', 'joy', 'good', 'great', 'wonderful', 'amazing', 'love', 'excited', 'grateful', 'hopeful'];
    const negativeWords = ['sad', 'angry', 'bad', 'terrible', 'awful', 'hate', 'depressed', 'anxious', 'worried', 'stressed'];
    const emotionWords = {
      happy: ['happy', 'joy', 'cheerful', 'delighted'],
      sad: ['sad', 'down', 'blue', 'melancholy'],
      anxious: ['anxious', 'worried', 'nervous', 'stressed'],
      angry: ['angry', 'mad', 'furious', 'irritated'],
      calm: ['calm', 'peaceful', 'relaxed', 'serene'],
      grateful: ['grateful', 'thankful', 'appreciative'],
      hopeful: ['hopeful', 'optimistic', 'positive'],
      lonely: ['lonely', 'isolated', 'alone']
    };

    const words = inputText.toLowerCase().split(/\s+/);
    
    let positiveCount = 0;
    let negativeCount = 0;
    const detectedEmotions: string[] = [];
    const keywords: string[] = [];

    words.forEach(word => {
      if (positiveWords.includes(word)) {
        positiveCount++;
        keywords.push(word);
      }
      if (negativeWords.includes(word)) {
        negativeCount++;
        keywords.push(word);
      }
      
      Object.entries(emotionWords).forEach(([emotion, emotionWordList]) => {
        if (emotionWordList.includes(word) && !detectedEmotions.includes(emotion)) {
          detectedEmotions.push(emotion);
        }
      });
    });

    let sentiment: 'positive' | 'negative' | 'neutral';
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
    } else {
      sentiment = 'neutral';
    }

    const intensity = Math.min((positiveCount + negativeCount) / words.length * 10, 1);

    return {
      sentiment,
      emotions: detectedEmotions.length > 0 ? detectedEmotions : ['neutral'],
      intensity,
      keywords: [...new Set(keywords)]
    };
  };

  useEffect(() => {
    if (text && text.length > 10) {
      setIsAnalyzing(true);
      setError(null);
      
      analyzeText(text)
        .then(analysis => {
          onAnalysisComplete(analysis);
        })
        .catch(err => {
          console.error('Analysis error:', err);
          setError('Failed to analyze mood. Please try again.');
        })
        .finally(() => {
          setIsAnalyzing(false);
        });
    }
  }, [text, onAnalysisComplete]);

  if (!text || text.length <= 10) {
    return null;
  }

  return (
    <Card className="mt-4 bg-blue-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-blue-800">
          {isAnalyzing ? 'Analyzing your emotions...' : 'Mood Analysis'}
        </CardTitle>
      </CardHeader>
      {error && (
        <CardContent>
          <p className="text-sm text-red-600">{error}</p>
        </CardContent>
      )}
    </Card>
  );
};

export default MoodAnalyzer;
