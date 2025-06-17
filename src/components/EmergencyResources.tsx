
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, Globe, Heart, AlertTriangle, Clock, MapPin, ExternalLink } from 'lucide-react';

const EmergencyResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState('crisis');

  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      phone: "988",
      description: "Free and confidential emotional support 24/7",
      available: "24/7",
      type: "call",
      urgent: true
    },
    {
      name: "Crisis Text Line",
      phone: "741741",
      description: "Text HOME for crisis support",
      available: "24/7",
      type: "text",
      urgent: true
    },
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "Support for domestic violence survivors",
      available: "24/7",
      type: "call",
      urgent: true
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service",
      available: "24/7",
      type: "call",
      urgent: false
    }
  ];

  const specializedResources = [
    {
      name: "Trevor Project",
      phone: "1-866-488-7386",
      description: "Crisis intervention for LGBTQ+ youth",
      demographic: "LGBTQ+"
    },
    {
      name: "Veterans Crisis Line",
      phone: "1-800-273-8255",
      description: "Support for veterans and their families",
      demographic: "Veterans"
    },
    {
      name: "Trans Lifeline",
      phone: "877-565-8860",
      description: "Support for transgender individuals",
      demographic: "Transgender"
    },
    {
      name: "National Sexual Assault Hotline",
      phone: "1-800-656-4673",
      description: "Support for sexual assault survivors",
      demographic: "Survivors"
    }
  ];

  const onlineResources = [
    {
      name: "Crisis Chat",
      url: "https://suicidepreventionlifeline.org/chat/",
      description: "Online chat with crisis counselors"
    },
    {
      name: "7 Cups",
      url: "https://www.7cups.com/",
      description: "Free emotional support from trained listeners"
    },
    {
      name: "BetterHelp",
      url: "https://www.betterhelp.com/",
      description: "Professional online therapy (paid service)"
    },
    {
      name: "NAMI",
      url: "https://nami.org/",
      description: "Mental health education and support groups"
    }
  ];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const handleText = (phone: string) => {
    window.open(`sms:${phone}`, '_blank');
  };

  const handleWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alert */}
      <Alert className="bg-red-50 border-red-200 hover:bg-red-100 transition-colors cursor-pointer">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">In Crisis? Get Help Now</AlertTitle>
        <AlertDescription className="text-red-700">
          <p className="mb-3">If you're having thoughts of self-harm or suicide, please reach out immediately:</p>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleCall('988')}
              className="hover:scale-105 transition-transform cursor-pointer"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call 988
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleText('741741')}
              className="border-red-300 text-red-700 hover:bg-red-50 hover:scale-105 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Text 741741
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 cursor-pointer">
          <TabsTrigger value="crisis" className="cursor-pointer hover:bg-gray-100 transition-colors">
            Crisis Support
          </TabsTrigger>
          <TabsTrigger value="specialized" className="cursor-pointer hover:bg-gray-100 transition-colors">
            Specialized Help
          </TabsTrigger>
          <TabsTrigger value="online" className="cursor-pointer hover:bg-gray-100 transition-colors">
            Online Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crisis" className="space-y-4">
          <div className="grid gap-4">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm cursor-pointer hover:scale-[1.02]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                        {resource.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Emergency
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                      <div className="flex items-center text-xs text-gray-500 space-x-3">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.available}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {resource.type === 'call' ? (
                        <Button
                          size="sm"
                          onClick={() => handleCall(resource.phone)}
                          className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all cursor-pointer"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleText(resource.phone)}
                          className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Text
                        </Button>
                      )}
                      <span className="text-xs font-mono text-center text-gray-600">
                        {resource.phone}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specialized" className="space-y-4">
          <div className="grid gap-4">
            {specializedResources.map((resource, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm cursor-pointer hover:scale-[1.02]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {resource.demographic}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Button
                        size="sm"
                        onClick={() => handleCall(resource.phone)}
                        className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all cursor-pointer"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <span className="text-xs font-mono text-gray-600">
                        {resource.phone}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="online" className="space-y-4">
          <div className="grid gap-4">
            {onlineResources.map((resource, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm cursor-pointer hover:scale-[1.02]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{resource.name}</h3>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleWebsite(resource.url)}
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Support Information */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">You Are Not Alone</h3>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Mental health struggles are common and treatable. Reaching out for help is a sign of strength, 
            not weakness. These resources are here to support you through difficult times.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyResources;
