
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, Heart, ExternalLink } from 'lucide-react';

interface CrisisDetectionProps {
  text: string;
  onCrisisDetected: (level: 'low' | 'medium' | 'high') => void;
}

const CrisisDetection: React.FC<CrisisDetectionProps> = ({ text, onCrisisDetected }) => {
  const [riskLevel, setRiskLevel] = useState<'none' | 'low' | 'medium' | 'high'>('none');
  
  const crisisKeywords = {
    high: [
      'suicide', 'kill myself', 'end it all', 'better off dead', 'ending my life',
      'suicide plan', 'kill me', 'want to die', 'no reason to live'
    ],
    medium: [
      'self harm', 'hurt myself', 'cutting', 'can\'t go on', 'giving up',
      'hopeless', 'no way out', 'burden', 'everyone would be better without me'
    ],
    low: [
      'really struggling', 'can\'t cope', 'overwhelmed', 'breaking point',
      'too much', 'can\'t handle', 'falling apart', 'lost'
    ]
  };

  const analyzeText = (inputText: string) => {
    if (!inputText || inputText.length < 10) {
      setRiskLevel('none');
      return;
    }

    const lowerText = inputText.toLowerCase();
    
    // Check for high-risk keywords
    const highRiskFound = crisisKeywords.high.some(keyword => 
      lowerText.includes(keyword)
    );
    
    if (highRiskFound) {
      setRiskLevel('high');
      onCrisisDetected('high');
      return;
    }
    
    // Check for medium-risk keywords
    const mediumRiskFound = crisisKeywords.medium.some(keyword => 
      lowerText.includes(keyword)
    );
    
    if (mediumRiskFound) {
      setRiskLevel('medium');
      onCrisisDetected('medium');
      return;
    }
    
    // Check for low-risk keywords
    const lowRiskFound = crisisKeywords.low.some(keyword => 
      lowerText.includes(keyword)
    );
    
    if (lowRiskFound) {
      setRiskLevel('low');
      onCrisisDetected('low');
      return;
    }
    
    setRiskLevel('none');
  };

  useEffect(() => {
    analyzeText(text);
  }, [text]);

  if (riskLevel === 'none') {
    return null;
  }

  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'high':
        return {
          color: 'bg-red-50 border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          title: '🚨 Crisis Support Needed',
          message: 'I\'m very concerned about what you\'ve shared. Your life has value and help is available right now.',
          urgent: true
        };
      case 'medium':
        return {
          color: 'bg-orange-50 border-orange-200',
          textColor: 'text-orange-800',
          iconColor: 'text-orange-600',
          title: '⚠️ Additional Support Recommended',
          message: 'It sounds like you\'re going through a really difficult time. Please consider reaching out for professional support.',
          urgent: false
        };
      case 'low':
        return {
          color: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
          title: '💛 Support Available',
          message: 'I can hear that things are challenging right now. Remember that support is available when you need it.',
          urgent: false
        };
      default:
        return null;
    }
  };

  const config = getRiskConfig();
  if (!config) return null;

  return (
    <Alert className={`${config.color} mt-4`}>
      <AlertTriangle className={`h-4 w-4 ${config.iconColor}`} />
      <AlertTitle className={config.textColor}>{config.title}</AlertTitle>
      <AlertDescription className={config.textColor}>
        <p className="mb-3">{config.message}</p>
        
        <div className="space-y-2">
          {config.urgent && (
            <div className="flex flex-wrap gap-2 mb-3">
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => window.open('tel:988', '_blank')}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call 988 (Crisis Line)
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('sms:741741', '_blank')}
              >
                Text HOME to 741741
              </Button>
            </div>
          )}
          
          <div className="text-sm space-y-1">
            <p className="font-medium">Available Resources:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>National Suicide Prevention Lifeline: 988</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>Trevor Project (LGBTQ+): 1-866-488-7386</li>
              <li>Veterans Crisis Line: 1-800-273-8255</li>
            </ul>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm">You matter, and help is always available.</span>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default CrisisDetection;
