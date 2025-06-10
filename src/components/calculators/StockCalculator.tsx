import React, { useState, useEffect } from 'react';
import { LineChart, TrendingUp, Calendar, IndianRupee, BarChart3 } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface StockData {
  year: number;
  stockValue: number;
  indexValue: number;
  stockReturn: number;
  indexReturn: number;
}

const StockCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [stockReturn, setStockReturn] = useState(15);
  const [marketReturn, setMarketReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [data, setData] = useState<StockData[]>([]);

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

  useEffect(() => {
    calculateReturns();
  }, [initialInvestment, stockReturn, marketReturn, timePeriod]);

  const finalData = data[data.length - 1];
  const finalStockValue = finalData?.stockValue || 0;
  const finalIndexValue = finalData?.indexValue || 0;
  const stockTotalReturn = finalStockValue - initialInvestment;
  const indexTotalReturn = finalIndexValue - initialInvestment;
  const outperformance = finalStockValue - finalIndexValue;
  const stockCagr = ((finalStockValue / initialInvestment) ** (1 / timePeriod) - 1) * 100;
  const indexCagr = ((finalIndexValue / initialInvestment) ** (1 / timePeriod) - 1) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <LineChart className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Return Calculator</h1>
        <p className="text-gray-600">Compare stock performance against market benchmarks</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Investment Parameters</h3>
            
            <div className="space-y-6">
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
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">Stock Value</h4>
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-xl font-bold text-purple-600">
                ₹{finalStockValue.toLocaleString('en-IN')}
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
                <h4 className="text-sm font-medium text-gray-600">Outperformance</h4>
                <IndianRupee className="h-5 w-5 text-green-600" />
              </div>
              <div className={`text-xl font-bold ${outperformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {outperformance >= 0 ? '+' : ''}₹{Math.abs(outperformance).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                vs Market
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">Alpha</h4>
                <LineChart className="h-5 w-5 text-amber-600" />
              </div>
              <div className={`text-xl font-bold ${stockReturn >= marketReturn ? 'text-green-600' : 'text-red-600'}`}>
                {stockReturn >= marketReturn ? '+' : ''}{(stockReturn - marketReturn).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Annual
              </div>
            </div>
          </div>

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
                    formatter={(value: any, name: string) => [
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
                    formatter={(value: any, name: string) => [
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

          {/* Analysis */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Analysis</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-700">
                  <strong>Risk Premium:</strong> The stock earns {(stockReturn - marketReturn >= 0 ? '+' : '')}{(stockReturn - marketReturn).toFixed(1)}% extra return per year compared to market.
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Wealth Impact:</strong> Over {timePeriod} years, this generates {outperformance >= 0 ? 'additional' : 'reduced'} wealth of ₹{Math.abs(outperformance).toLocaleString('en-IN')}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCalculator;