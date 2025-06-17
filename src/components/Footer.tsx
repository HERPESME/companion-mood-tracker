
import React from 'react';
import { Heart, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, Shield, FileText, HelpCircle, Users, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-green-50/50 border-t border-gray-200/50 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  MindfulJourney
                </h3>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Sparkles className="w-3 h-3" />
                  <span>AI-Powered Wellness</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Your personal AI companion for mental wellness. Journal, reflect, and grow with compassionate AI support that understands you.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Twitter, color: 'hover:text-blue-400', bg: 'hover:bg-blue-50' },
                { icon: Facebook, color: 'hover:text-blue-600', bg: 'hover:bg-blue-50' },
                { icon: Instagram, color: 'hover:text-pink-500', bg: 'hover:bg-pink-50' },
                { icon: Linkedin, color: 'hover:text-blue-700', bg: 'hover:bg-blue-50' }
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`w-9 h-9 rounded-full text-gray-400 ${social.color} ${social.bg} transition-all duration-200 hover:scale-110`}
                >
                  <social.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
              Features
            </h4>
            <ul className="space-y-3">
              {[
                'AI Journal Analysis',
                'Mood Tracking',
                'Crisis Support',
                'Personalized Insights',
                'Voice Recording',
                'Anonymous Mode'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2 text-green-500" />
              Support
            </h4>
            <ul className="space-y-3">
              {[
                'Help Center',
                'Crisis Resources',
                'Privacy Policy',
                'Terms of Service',
                'Contact Us',
                'Community Guidelines'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-purple-500" />
              Stay Updated
            </h4>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Get mental wellness tips and updates delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-white/80 border-gray-200 hover:border-purple-300 focus:border-purple-400 transition-all duration-200"
              />
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 hover:scale-105">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-t border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-4 text-center">
            <Shield className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-medium text-red-800">Crisis Support:</span>
              <span className="text-red-700 ml-1">
                If you're having thoughts of self-harm, please reach out immediately.
              </span>
              <Button
                variant="link"
                className="text-red-600 hover:text-red-800 font-medium p-0 ml-2 h-auto"
              >
                Get Help Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-100/50 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                © 2024 MindfulJourney
                <Heart className="w-3 h-3 mx-1 text-red-400" />
                All rights reserved
              </span>
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">Privacy</a>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">Terms</a>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">Cookies</a>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                HIPAA Compliant
              </span>
              <span className="flex items-center">
                <FileText className="w-3 h-3 mr-1" />
                ISO 27001 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
