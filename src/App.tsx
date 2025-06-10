import React, { useState } from 'react';
import { Calculator, Bot, TrendingUp, Banknote, PiggyBank, LineChart } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import SIPCalculator from './components/calculators/SIPCalculator';
import LumpSumCalculator from './components/calculators/LumpSumCalculator';
import StockCalculator from './components/calculators/StockCalculator';
import FixedIncomeCalculator from './components/calculators/FixedIncomeCalculator';
import ComparisonTool from './components/ComparisonTool';

export type ActiveSection = 'home' | 'sip' | 'lumpsum' | 'stocks' | 'fixed-income' | 'comparison' | 'ai-assistant';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const navigationItems = [
    { id: 'home' as const, label: 'Home', icon: TrendingUp },
    { id: 'sip' as const, label: 'SIP Calculator', icon: PiggyBank },
    { id: 'lumpsum' as const, label: 'Lump Sum', icon: Banknote },
    { id: 'stocks' as const, label: 'Stock Returns', icon: LineChart },
    { id: 'fixed-income' as const, label: 'Fixed Income', icon: Calculator },
    { id: 'comparison' as const, label: 'Compare', icon: TrendingUp },
    { id: 'ai-assistant' as const, label: 'AI Assistant', icon: Bot },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onNavigate={setActiveSection} />;
      case 'sip':
        return <SIPCalculator />;
      case 'lumpsum':
        return <LumpSumCalculator />;
      case 'stocks':
        return <StockCalculator />;
      case 'fixed-income':
        return <FixedIncomeCalculator />;
      case 'comparison':
        return <ComparisonTool />;
      case 'ai-assistant':
        return <AIAssistant />;
      default:
        return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header 
        activeSection={activeSection}
        onNavigate={setActiveSection}
        navigationItems={navigationItems}
      />
      <main className="transition-all duration-500 ease-in-out">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;