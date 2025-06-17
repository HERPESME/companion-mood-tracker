
import React from 'react';
import { Heart, Sparkles, Shield, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  anonymousMode: boolean;
  userName: string;
  onToggleAnonymousMode: () => void;
  onUserNameChange: (name: string) => void;
  onShowAuthDialog: () => void;
}

const Header: React.FC<HeaderProps> = ({
  anonymousMode,
  userName,
  onToggleAnonymousMode,
  onUserNameChange,
  onShowAuthDialog
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gradient-to-r from-blue-200/50 to-green-200/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition-all duration-300 group">
            <div className="relative p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <Heart className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-green-400 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent flex items-center">
                MindfulJourney
                <Sparkles className="w-5 h-5 ml-2 text-purple-500 animate-pulse" />
              </h1>
              <p className="text-sm text-gray-600 font-medium">AI-Powered Mental Wellness Companion</p>
            </div>
          </div>
          
          {/* User Controls */}
          <div className="flex items-center space-x-6">
            {/* Mode Indicator */}
            <div className="flex items-center space-x-3 bg-gray-50/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${anonymousMode ? 'bg-amber-400' : 'bg-green-400'} animate-pulse`}></div>
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {anonymousMode ? 'Anonymous Mode' : 'Personal Mode'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleAnonymousMode}
                className="text-xs font-medium hover:bg-white hover:shadow-md transition-all duration-200 rounded-full px-3"
              >
                {anonymousMode ? (
                  <>
                    <UserPlus className="w-3 h-3 mr-1" />
                    Sign In
                  </>
                ) : 'Sign Out'}
              </Button>
            </div>
            
            {/* User Name Input */}
            {!anonymousMode && (
              <div className="relative">
                <Input
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => onUserNameChange(e.target.value)}
                  className="w-40 h-9 text-sm bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-all duration-200 rounded-full px-4"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            )}
            
            {/* CTA Button */}
            {anonymousMode && (
              <Button
                onClick={onShowAuthDialog}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
