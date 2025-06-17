import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, ExternalLink, Heart, Shield, Users, Clock, Globe } from 'lucide-react';

interface Resource {
  name: string;
  description: string;
  phone?: string;
  text?: string;
  website?: string;
  available: string;
  category: 'crisis' | 'mental-health' | 'support' | 'specialty';
}

const EmergencyResources: React.FC = () => {
  const resources: Resource[] = [
    {
      name: "National Suicide Prevention Lifeline",
      description: "24/7 crisis support for people in emotional distress or suicidal crisis",
      phone: "988",
      website: "https://suicidepreventionlifeline.org",
      available: "24/7",
      category: "crisis"
    },
    {
      name: "Crisis Text Line",
      description: "Free, 24/7 support for those in crisis via text message",
      text: "741741",
      website: "https://crisistextline.org",
      available: "24/7",
      category: "crisis"
    },
    {
      name: "SAMHSA National Helpline",
      description: "Treatment referral and information service for mental health and substance abuse",
      phone: "1-800-662-4357",
      website: "https://samhsa.gov",
      available: "24/7",
      category: "mental-health"
    },
    {
      name: "The Trevor Project",
      description: "Crisis support services for LGBTQ+ young people",
      phone: "1-866-488-7386",
      text: "678678",
      website: "https://thetrevorproject.org",
      available: "24/7",
      category: "specialty"
    },
    {
      name: "Veterans Crisis Line",
      description: "Confidential support for veterans in crisis and their families",
      phone: "1-800-273-8255",
      text: "838255",
      website: "https://veteranscrisisline.net",
      available: "24/7",
      category: "specialty"
    },
    {
      name: "National Domestic Violence Hotline",
      description: "Confidential support for those experiencing domestic violence",
      phone: "1-800-799-7233",
      website: "https://thehotline.org",
      available: "24/7",
      category: "specialty"
    },
    {
      name: "NAMI HelpLine",
      description: "Support, information and referrals for mental health conditions",
      phone: "1-800-950-6264",
      website: "https://nami.org",
      available: "Mon-Fri 10am-8pm ET",
      category: "support"
    },
    {
      name: "Mental Health America",
      description: "Mental health resources, screening tools, and advocacy",
      website: "https://mhanational.org",
      available: "Online resources",
      category: "mental-health"
    }
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case 'crisis':
        return <Phone className="w-5 h-5 text-red-500" />;
      case 'mental-health':
        return <Heart className="w-5 h-5 text-blue-500" />;
      case 'support':
        return <Users className="w-5 h-5 text-green-500" />;
      case 'specialty':
        return <Shield className="w-5 h-5 text-purple-500" />;
      default:
        return <Heart className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crisis':
        return 'border-l-4 border-l-red-500 bg-red-50';
      case 'mental-health':
        return 'border-l-4 border-l-blue-500 bg-blue-50';
      case 'support':
        return 'border-l-4 border-l-green-500 bg-green-50';
      case 'specialty':
        return 'border-l-4 border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-4 border-l-gray-500 bg-gray-50';
    }
  };

  const crisisResources = resources.filter(r => r.category === 'crisis');
  const otherResources = resources.filter(r => r.category !== 'crisis');

  return (
    <div className="space-y-6">
      {/* Crisis Resources */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">Immediate Crisis Support</h2>
        </div>
        <p className="text-gray-600 mb-6">
          If you're in immediate danger or having thoughts of self-harm, please reach out right now:
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          {crisisResources.map((resource, index) => (
            <Card key={index} className={`shadow-lg ${getCategoryColor(resource.category)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  {getIcon(resource.category)}
                  <span>{resource.name}</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{resource.available}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {resource.phone && (
                    <Button 
                      size="sm" 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => window.open(`tel:${resource.phone}`, '_blank')}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call {resource.phone}
                    </Button>
                  )}
                  
                  {resource.text && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`sms:${resource.text}`, '_blank')}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Text {resource.text}
                    </Button>
                  )}
                  
                  {resource.website && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(resource.website, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Website
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Resources */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Additional Support Resources</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Professional support, information, and specialized services:
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {otherResources.map((resource, index) => (
            <Card key={index} className={`shadow-md hover:shadow-lg transition-shadow ${getCategoryColor(resource.category)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base">
                  {getIcon(resource.category)}
                  <span>{resource.name}</span>
                </CardTitle>
                <CardDescription className="text-xs">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{resource.available}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {resource.phone && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => window.open(`tel:${resource.phone}`, '_blank')}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  )}
                  
                  {resource.text && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => window.open(`sms:${resource.text}`, '_blank')}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Text
                    </Button>
                  )}
                  
                  {resource.website && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => window.open(resource.website, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Visit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Self-Care Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Self-Care & Coping Strategies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Immediate Coping Techniques:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 4-7-8 breathing (inhale 4, hold 7, exhale 8)</li>
                <li>• 5-4-3-2-1 grounding (5 things you see, 4 you touch, etc.)</li>
                <li>• Progressive muscle relaxation</li>
                <li>• Call a trusted friend or family member</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Daily Wellness Practices:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Regular sleep schedule (7-9 hours)</li>
                <li>• Daily movement or exercise</li>
                <li>• Mindfulness or meditation</li>
                <li>• Limiting alcohol and substances</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Important Disclaimer:</p>
              <p>
                This AI chatbot is not a replacement for professional mental health care. 
                If you're experiencing a mental health crisis or having thoughts of self-harm, 
                please contact a mental health professional or emergency services immediately. 
                The resources provided here are for informational purposes and immediate support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyResources;
