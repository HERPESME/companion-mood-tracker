
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, Eye, EyeOff, Chrome, Apple, Github } from 'lucide-react';
import { useState } from 'react';

interface AuthPromptProps {
  onSignIn: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ onSignIn, isOpen, onOpenChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignIn();
      onOpenChange(false);
    }, 1500);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignIn();
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to MindfulJourney
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Sign in to unlock personalized insights and save your progress
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin" className="text-sm font-medium">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="text-sm font-medium">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            {/* Social Sign In Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>
              
              <Button
                onClick={() => handleSocialSignIn('apple')}
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-900 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Apple className="w-5 h-5 mr-3" />
                Continue with Apple
              </Button>
              
              <Button
                onClick={() => handleSocialSignIn('github')}
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Github className="w-5 h-5 mr-3" />
                Continue with GitHub
              </Button>
            </div>

            <div className="relative">
              <Separator className="my-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Email Sign In Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center">
              <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot your password?
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            {/* Social Sign Up Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Chrome className="w-5 h-5 mr-3" />
                Sign up with Google
              </Button>
              
              <Button
                onClick={() => handleSocialSignIn('apple')}
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-900 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Apple className="w-5 h-5 mr-3" />
                Sign up with Apple
              </Button>
              
              <Button
                onClick={() => handleSocialSignIn('github')}
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Github className="w-5 h-5 mr-3" />
                Sign up with GitHub
              </Button>
            </div>

            <div className="relative">
              <Separator className="my-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">or sign up with email</span>
              </div>
            </div>

            {/* Email Sign Up Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    className="pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our{' '}
              <Button variant="link" className="text-xs p-0 h-auto text-blue-600">Terms of Service</Button>
              {' '}and{' '}
              <Button variant="link" className="text-xs p-0 h-auto text-blue-600">Privacy Policy</Button>
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPrompt;
