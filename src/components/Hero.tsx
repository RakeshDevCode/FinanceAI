import React from 'react';
import { Calculator, PiggyBank, TrendingUp, Bot, ArrowRight, Sparkles } from 'lucide-react';
import { ActiveSection } from '../App';

interface HeroProps {
  onNavigate: (section: ActiveSection) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: PiggyBank,
      title: 'SIP Calculator',
      description: 'Calculate returns on systematic investment plans with detailed projections',
      section: 'sip' as const,
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: Calculator,
      title: 'Lump Sum Calculator',
      description: 'Analyze one-time investment growth with compound interest calculations',
      section: 'lumpsum' as const,
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: TrendingUp,
      title: 'Stock Returns',
      description: 'Compare stock performance against market benchmarks and indices',
      section: 'stocks' as const,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get personalized financial advice and investment recommendations',
      section: 'ai-assistant' as const,
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-cyan-600/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Financial Planning</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
            Smart Financial
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"> Planning</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-200">
            Make informed investment decisions with our comprehensive suite of financial calculators, 
            AI-powered insights, and interactive visualization tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-400">
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Bot className="h-6 w-6" />
              <span>Start with AI Assistant</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => onNavigate('sip')}
              className="bg-white/70 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg border border-white/20 hover:bg-white/90 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Explore Calculators
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.section}
                className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 hover:shadow-lg hover:shadow-blue-500/10 transform hover:scale-105 transition-all duration-300 cursor-pointer animate-in fade-in-50 slide-in-from-bottom-4"
                style={{ animationDelay: `${600 + index * 100}ms` }}
                onClick={() => onNavigate(feature.section)}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="flex items-center mt-4 text-blue-600 group-hover:translate-x-2 transition-transform duration-200">
                  <span className="text-sm font-medium">Get Started</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-1000">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Calculations Made</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">₹50Cr+</div>
            <div className="text-gray-600">Investment Planned</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
            <div className="text-gray-600">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;