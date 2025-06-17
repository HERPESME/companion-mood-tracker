
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, TrendingUp, Database, Clock, UserPlus, Sparkles } from 'lucide-react';

interface AnonymousLimitationsProps {
  onSignInClick: () => void;
}

const AnonymousLimitations: React.FC<AnonymousLimitationsProps> = ({ onSignInClick }) => {
  return (
    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-800">
          <Shield className="w-5 h-5 mr-2" />
          Anonymous Mode Limitations
        </CardTitle>
        <CardDescription className="text-amber-700">
          You're browsing anonymously. Some features are limited to protect your privacy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-amber-200">
            <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">No Mood Insights</h4>
              <p className="text-sm text-amber-700">Historical mood tracking and trend analysis unavailable</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-amber-200">
            <Database className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">No Data Persistence</h4>
              <p className="text-sm text-amber-700">Journal entries are lost when you close the browser</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-amber-200">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">Limited AI Memory</h4>
              <p className="text-sm text-amber-700">AI can't remember previous conversations across sessions</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-amber-200">
            <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">Basic Features Only</h4>
              <p className="text-sm text-amber-700">Advanced analytics and personalized recommendations disabled</p>
            </div>
          </div>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <UserPlus className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Unlock Full Experience</AlertTitle>
          <AlertDescription className="text-blue-700">
            Sign in to save your progress, track mood patterns over time, and get personalized AI insights that learn from your journal entries.
          </AlertDescription>
        </Alert>

        <Button 
          onClick={onSignInClick}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Sign In to Unlock Full Features
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnonymousLimitations;
