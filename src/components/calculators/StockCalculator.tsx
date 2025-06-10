import React, { useState, useEffect } from 'react';
import { LineChart, TrendingUp, Calendar, IndianRupee, BarChart3, CreditCard, Percent, Calculator, DollarSign } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';

interface StockData {
  year: number;
  stockValue: number;
  indexValue: number;
  stockReturn: number;
  indexReturn: number;
}

interface MarginData {
  day: number;
  stockPrice: number;
  interestCost: number;
  totalCost: number;
  netValue: number;
  effectivePrice: number;
}

const StockCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [stockReturn, setStockReturn] = useState(15);
  const [marketReturn, setMarketReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [data, setData] = useState<StockData[]>([]);
  
  // Margin trading states
  const [tradingType, setTradingType] = useState<'cash' | 'margin'>('cash');
  const [marginInterestRate, setMarginInterestRate] = useState(18);
  const [marginPercentage, setMarginPercentage] = useState(50);
  const [exitDays, setExitDays] = useState(30);
  const [brokerageRate, setBrokerageRate] = useState(0.00175); // 10 paisa per 100 rupees
  const [marginData, setMarginData] = useState<MarginData[]>([]);

  const calculateReturns = () => {
    const chartData: StockData[] = [];
    
    for (let year = 1; year <= timePeriod; year++) {
      const stockValue = initialInvestment * Math.pow(1 + stockReturn / 100, year);
      const indexValue = initialInvestment * Math.pow(1 + marketReturn / 100, year);
      const stockReturnAmount = stockValue - initialInvestment;
      const indexReturnAmount = indexValue - initialInvestment;
      
      chartData.push({
        year,
        stockValue: Math.round(stockValue),
        indexValue: Math.round(indexValue),
        stockReturn: Math.round(stockReturnAmount),
        indexReturn: Math.round(indexReturnAmount),
      });
    }
    
    setData(chartData);
  };

  const calculateMarginTrading = () => {
    if (tradingType === 'cash') return;

    const marginAmount = initialInvestment * (marginPercentage / 100);
    const borrowedAmount = initialInvestment - marginAmount;
    const dailyInterestRate = marginInterestRate / 100 / 365;
    const dailyStockReturn = stockReturn / 100 / 365;
    
    const marginChartData: MarginData[] = [];
    
    for (let day = 1; day <= exitDays; day++) {
      // Calculate stock price growth
      const stockPrice = initialInvestment * Math.pow(1 + dailyStockReturn, day);
      
      // Calculate accumulated interest
      const interestCost = borrowedAmount * dailyInterestRate * day;
      
      // Calculate total cost (margin + interest)
      const totalCost = marginAmount + interestCost;
      
      // Calculate net value after interest
      const netValue = stockPrice - interestCost;
      
      // Calculate effective price per share (assuming 1 share for simplicity)
      const effectivePrice = totalCost;
      
      marginChartData.push({
        day,
        stockPrice: Math.round(stockPrice),
        interestCost: Math.round(interestCost),
        totalCost: Math.round(totalCost),
        netValue: Math.round(netValue),
        effectivePrice: Math.round(effectivePrice),
      });
    }
    
    setMarginData(marginChartData);
  };

  const calculateBrokerage = (value: number) => {
    return value * brokerageRate;
  };

  const calculateFinalReturns = () => {
    if (tradingType === 'cash') {
      const finalValue = data[data.length - 1]?.stockValue || 0;
      const buyBrokerage = calculateBrokerage(initialInvestment);
      const sellBrokerage = calculateBrokerage(finalValue);
      const totalBrokerage = buyBrokerage + sellBrokerage;
      return {
        finalValue: finalValue - totalBrokerage,
        totalBrokerage,
        netReturn: finalValue - initialInvestment - totalBrokerage,
      };
    } else {
      const finalMarginData = marginData[marginData.length - 1];
      if (!finalMarginData) return { finalValue: 0, totalBrokerage: 0, netReturn: 0 };
      
      const buyBrokerage = calculateBrokerage(initialInvestment);
      const sellBrokerage = calculateBrokerage(finalMarginData.stockPrice);
      const totalBrokerage = buyBrokerage + sellBrokerage;
      const finalValue = finalMarginData.netValue - totalBrokerage;
      const marginAmount = initialInvestment * (marginPercentage / 100);
      
      return {
        finalValue,
        totalBrokerage,
        netReturn: finalValue - marginAmount,
        interestPaid: finalMarginData.interestCost,
      };
    }
  };

  useEffect(() => {
    calculateReturns();
  }, );

  useEffect(() => {
    calculateMarginTrading();
  }, );

  const finalData = data[data.length - 1];
  const finalStockValue = finalData?.stockValue || 0;
  const finalIndexValue = finalData?.indexValue || 0;
 // const stockTotalReturn = finalStockValue - initialInvestment;
 // const indexTotalReturn = finalIndexValue - initialInvestment;
 // const outperformance = finalStockValue - finalIndexValue;
  const stockCagr = ((finalStockValue / initialInvestment) ** (1 / timePeriod) - 1) * 100;
  const indexCagr = ((finalIndexValue / initialInvestment) ** (1 / timePeriod) - 1) * 100;

  const finalReturns = calculateFinalReturns();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <LineChart className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Return Calculator</h1>
        <p className="text-gray-600">Compare stock performance with cash vs margin trading options</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Investment Parameters</h3>
            
            {/* Trading Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Trading Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTradingType('cash')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                    tradingType === 'cash'
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm font-medium">Cash</span>
                </button>
                <button
                  onClick={() => setTradingType('margin')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                    tradingType === 'margin'
                      ? 'bg-orange-100 border-orange-500 text-orange-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm font-medium">Margin</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Investment
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="100000"
                />
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹10K</span>
                <span>₹50L</span>
              </div>
            </div>

            {/* Margin Trading Options */}
            {tradingType === 'margin' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Margin Percentage (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500" />
                    <input
                      type="number"
                      value={marginPercentage}
                      onChange={(e) => setMarginPercentage(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="50"
                      min="10"
                      max="90"
                    />
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={marginPercentage}
                    onChange={(e) => setMarginPercentage(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Margin Interest Rate (% p.a.)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                    <input
                      type="number"
                      value={marginInterestRate}
                      onChange={(e) => setMarginInterestRate(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="18"
                      step="0.5"
                    />
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="30"
                    step="0.5"
                    value={marginInterestRate}
                    onChange={(e) => setMarginInterestRate(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>8%</span>
                    <span>30%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exit After (Days)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={exitDays}
                      onChange={(e) => setExitDays(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="30"
                      min="1"
                      max="365"
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="365"
                    step="1"
                    value={exitDays}
                    onChange={(e) => setExitDays(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 Day</span>
                    <span>365 Days</span>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Annual Return (%)
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
                <input
                  type="number"
                  value={stockReturn}
                  onChange={(e) => setStockReturn(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="15"
                  step="0.5"
                />
              </div>
              <input
                type="range"
                min="-20"
                max="50"
                step="0.5"
                value={stockReturn}
                onChange={(e) => setStockReturn(Number(e.target.value))}
                className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>-20%</span>
                <span>50%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Market/Index Return (%)
              </label>
              <div className="relative">
                <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                <input
                  type="number"
                  value={marketReturn}
                  onChange={(e) => setMarketReturn(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12"
                  step="0.5"
                />
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={marketReturn}
                onChange={(e) => setMarketReturn(Number(e.target.value))}
                className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brokerage Rate (₹ per ₹100)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <button
                  onClick={() => setBrokerageRate(0.00175)}
                  className={`p-2 text-xs rounded ${brokerageRate === 0.00175 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                >
                  10 paisa
                </button>
                <button
                  onClick={() => setBrokerageRate(0.0035)}
                  className={`p-2 text-xs rounded ${brokerageRate === 0.0035 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                >
                  20 paisa
                </button>
                <button
                  onClick={() => setBrokerageRate(0.00525)}
                  className={`p-2 text-xs rounded ${brokerageRate === 0.00525 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                >
                  30 paisa
                </button>
              </div>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={(brokerageRate * 100).toFixed(4)}
                  onChange={(e) => setBrokerageRate(Number(e.target.value) / 100)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="0.175"
                  step="0.001"
                />
              </div>
            </div>

            {tradingType === 'cash' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Period (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          {tradingType === 'cash' ? (
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Stock Value</h4>
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-xl font-bold text-purple-600">
                  ₹{Math.trunc(Math.abs(finalReturns.finalValue)).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  CAGR: {stockCagr.toFixed(1)}%
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Market Value</h4>
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-xl font-bold text-blue-600">
                  ₹{finalIndexValue.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  CAGR: {indexCagr.toFixed(1)}%
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Net Return</h4>
                  <IndianRupee className="h-5 w-5 text-green-600" />
                </div>
                <div className={`text-xl font-bold ${finalReturns.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {finalReturns.netReturn >= 0 ? '+' : ''}₹{Math.trunc(Math.abs((finalReturns.netReturn)-(initialInvestment*(1-(marginPercentage*.01))))).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  After Brokerage
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Total Brokerage</h4>
                  <Calculator className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-xl font-bold text-amber-600">
                  ₹{finalReturns.totalBrokerage.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Buy + Sell
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Final Value</h4>
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-xl font-bold text-purple-600">
                  ₹{Math.trunc(Math.abs(finalReturns.finalValue)).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  After {exitDays} days
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Interest Paid</h4>
                  <CreditCard className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-xl font-bold text-red-600">
                  ₹{(finalReturns.interestPaid || 0).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {marginInterestRate}% p.a.
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Net Return</h4>
                  <IndianRupee className="h-5 w-5 text-green-600" />
                </div>
                <div className={`text-xl font-bold ${finalReturns.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {finalReturns.netReturn >= 0 ? '+' : ''}₹{Math.trunc(Math.abs((finalReturns.netReturn)-(initialInvestment*(1-(marginPercentage*.01))))).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  On margin invested
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Total Brokerage</h4>
                  <Calculator className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-xl font-bold text-amber-600">
                  ₹{Math.trunc(Math.abs(finalReturns.totalBrokerage)).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Buy + Sell
                </div>
              </div>
            </div>
          )}

          {/* Charts */}
          {tradingType === 'cash' ? (
            <>
              {/* Performance Comparison Chart */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Comparison</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                      />
                      <Tooltip 
                        formatter={(value: unknown, name: string) => [
                          `₹${Number(value).toLocaleString('en-IN')}`,
                          name === 'stockValue' ? 'Stock Value' : 'Market Value'
                        ]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="stockValue"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        name="Stock"
                      />
                      <Line
                        type="monotone"
                        dataKey="indexValue"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        name="Market"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Returns Comparison */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Returns Comparison</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                      />
                      <Tooltip 
                        formatter={(value: unknown, name: string) => [
                          `₹${Number(value).toLocaleString('en-IN')}`,
                          name === 'stockReturn' ? 'Stock Returns' : 'Market Returns'
                        ]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="stockReturn"
                        stackId="1"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="indexReturn"
                        stackId="2"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Margin Trading Performance */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Margin Trading Performance</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={marginData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        formatter={(value: unknown, name: string) => [
                          `₹${Number(value).toLocaleString('en-IN')}`,
                          name === 'stockPrice' ? 'Stock Price' : 
                          name === 'netValue' ? 'Net Value' : 
                          name === 'interestCost' ? 'Interest Cost' : 'Total Cost'
                        ]}
                        labelFormatter={(label) => `Day ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="stockPrice"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
                        name="Stock Price"
                      />
                      <Line
                        type="monotone"
                        dataKey="netValue"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                        name="Net Value"
                      />
                      <Line
                        type="monotone"
                        dataKey="interestCost"
                        stroke="#EF4444"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 2 }}
                        name="Interest Cost"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Daily Cost Breakdown */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Daily Cost Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marginData.slice(-Math.min(30, marginData.length))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        formatter={(value: unknown, name: string) => [
                          `₹${Number(value).toLocaleString('en-IN')}`,
                          name === 'interestCost' ? 'Interest Cost' : 'Total Cost'
                        ]}
                        labelFormatter={(label) => `Day ${label}`}
                      />
                      <Bar dataKey="interestCost" fill="#EF4444" name="Interest Cost" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* Analysis */}
          <div className={`bg-gradient-to-r ${tradingType === 'cash' ? 'from-purple-50 to-pink-50 border-purple-200' : 'from-orange-50 to-red-50 border-orange-200'} rounded-xl p-6 border`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {tradingType === 'cash' ? 'Investment Analysis' : 'Margin Trading Analysis'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {tradingType === 'cash' ? (
                <>
                  <div>
                    <p className="text-gray-700">
                      <strong>Risk Premium:</strong> The stock earns {(stockReturn - marketReturn >= 0 ? '+' : '')}{(stockReturn - marketReturn).toFixed(1)}% extra return per year compared to market.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>After Costs:</strong> Net return after brokerage is ₹{((finalReturns.netReturn)-(initialInvestment*(1-(marginPercentage*.01)))).toLocaleString('en-IN')} over {timePeriod} years.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-gray-700">
                      <strong>Leverage Effect:</strong> Using {marginPercentage}% margin amplifies both gains and losses. Your effective investment is ₹{(initialInvestment * marginPercentage / 100).toLocaleString('en-IN')}.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Cost of Leverage:</strong> Daily interest of ₹{((initialInvestment * (100 - marginPercentage) / 100) * marginInterestRate / 100 / 365).toFixed(0)} reduces your returns over {exitDays} days.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCalculator;
