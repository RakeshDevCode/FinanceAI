import React, { useState } from 'react';
import { Bot, Send, Lightbulb, TrendingUp, DollarSign, PieChart } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI financial advisor. I can help you with investment planning, risk assessment, and financial goal setting. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    {
      icon: TrendingUp,
      text: "What's the best investment strategy for a 25-year-old?",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: DollarSign,
      text: "How much should I invest monthly for retirement?",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: PieChart,
      text: "Help me diversify my investment portfolio",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      text: "Explain SIP vs lump sum investment",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('sip') || message.includes('systematic')) {
      return "SIP (Systematic Investment Plan) is excellent for building wealth gradually. It helps average out market volatility through rupee cost averaging. For someone starting out, I'd recommend beginning with ₹5,000-10,000 monthly in diversified equity mutual funds. The key benefits are discipline, affordability, and reduced timing risk.";
    }
    
    if (message.includes('retirement') || message.includes('retire')) {
      return "For retirement planning, follow the 25x rule - you need 25 times your annual expenses saved. If you're 25-30, aim to invest 20-25% of income. Start with equity-heavy allocation (70-80%) and gradually shift to debt as you approach retirement. Consider EPF, PPF, and equity mutual funds for tax efficiency.";
    }
    
    if (message.includes('portfolio') || message.includes('diversify')) {
      return "A well-diversified portfolio should include: 60-70% Equity (mix of large, mid, small cap), 20-25% Debt (government bonds, corporate bonds), 5-10% Gold, and 5% International equity. Rebalance annually and adjust allocation based on age and risk tolerance.";
    }
    
    if (message.includes('lump sum') || message.includes('one time')) {
      return "Lump sum works best when markets are undervalued or during corrections. If you have a large amount, consider STP (Systematic Transfer Plan) - invest lump sum in debt fund and transfer gradually to equity. This gives you rupee cost averaging benefits while earning better returns than savings account.";
    }
    
    if (message.includes('tax') || message.includes('80c')) {
      return "Maximize tax efficiency with: ELSS mutual funds (80C + long-term gains), PPF (80C + tax-free returns), EPF contribution, NPS (80CCD), and health insurance (80D). ELSS offers best returns among 80C options with only 3-year lock-in.";
    }
    
    return "That's a great question! Based on your query, I'd recommend starting with our calculators to get specific numbers for your situation. Consider your age, risk tolerance, and financial goals. Would you like me to guide you through any specific calculation or investment strategy?";
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">AI Financial Advisor</h2>
              <p className="text-blue-100 text-sm">Your personal investment guide</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Suggested questions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedPrompts.map((prompt, index) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSuggestedPrompt(prompt.text)}
                  className="flex items-center space-x-2 p-3 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                >
                  <div className={`w-6 h-6 bg-gradient-to-r ${prompt.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900">{prompt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder="Ask me anything about investments..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;