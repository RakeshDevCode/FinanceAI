import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface ComparisonData {
  category: string;
  sip: number;
  lumpSum: number;
  stocks: number;
  fixedDeposit: number;
}

const ComparisonTool: React.FC = () => {
  const [investment, setInvestment] = useState(100000);
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [timePeriod, setTimePeriod] = useState(10);
  const [data, setData] = useState<ComparisonData[]>([]);

  const calculateComparisons = () => {
    const sipRate = 12; // 12% for SIP
    const lumpSumRate = 12; // 12% for lump sum
    const stockRate = 15; // 15% for stocks
    const fdRate = 6.5; // 6.5% for FD

    // SIP Calculation
    const monthlyRate = sipRate / 100 / 12;
    const totalMonths = timePeriod * 12;
    const sipValue = monthlyAmount * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate);

    // Lump Sum Calculation
    const lumpSumValue = investment * Math.pow(1 + lumpSumRate / 100, timePeriod);

    // Stock Calculation
    const stockValue = investment * Math.pow(1 + stockRate / 100, timePeriod);

    // Fixed Deposit Calculation
    const fdValue = investment * Math.pow(1 + fdRate / 100, timePeriod);

    const comparisonData: ComparisonData[] = [
      {
        category: 'Final Value',
        sip: Math.round(sipValue),
        lumpSum: Math.round(lumpSumValue),
        stocks: Math.round(stockValue),
        fixedDeposit: Math.round(fdValue),
      },
    ];

    setData(comparisonData);
  };

  useEffect(() => {
    calculateComparisons();
  }, [investment, monthlyAmount, timePeriod]);

  const finalData = data[0];
  const sipInvested = monthlyAmount * timePeriod * 12;
  const sipReturns = finalData?.sip - sipInvested || 0;
  const lumpSumReturns = finalData?.lumpSum - investment || 0;
  const stockReturns = finalData?.stocks - investment || 0;
  const fdReturns = finalData?.fixedDeposit - investment || 0;

  const pieData = [
    { name: 'SIP', value: finalData?.sip || 0, color: '#10B981' },
    { name: 'Lump Sum', value: finalData?.lumpSum || 0, color: '#3B82F6' },
    { name: 'Stocks', value: finalData?.stocks || 0, color: '#8B5CF6' },
    { name: 'Fixed Deposit', value: finalData?.fixedDeposit || 0, color: '#F59E0B' },
  ];

  const returnsData = [
    { name: 'SIP', returns: sipReturns, invested: sipInvested, color: '#10B981' },
    { name: 'Lump Sum', returns: lumpSumReturns, invested: investment, color: '#3B82F6' },
    { name: 'Stocks', returns: stockReturns, invested: investment, color: '#8B5CF6' },
    { name: 'Fixed Deposit', returns: fdReturns, invested: investment, color: '#F59E0B' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Comparison Tool</h1>
        <p className="text-gray-600">Compare different investment strategies side by side</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg sticky top-24">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lump Sum Amount
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="100000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly SIP Amount
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="10"
                />
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Investment Summary</h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>SIP Total Investment:</span>
                  <span>₹{sipInvested.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lump Sum Investment:</span>
                  <span>₹{investment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Horizon:</span>
                  <span>{timePeriod} years</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">SIP</h4>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-xl font-bold text-green-600">
                ₹{(finalData?.sip || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Returns: +₹{sipReturns.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">Lump Sum</h4>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <div className="text-xl font-bold text-blue-600">
                ₹{(finalData?.lumpSum || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Returns: +₹{lumpSumReturns.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">Stocks</h4>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
              <div className="text-xl font-bold text-purple-600">
                ₹{(finalData?.stocks || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Returns: +₹{stockReturns.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">Fixed Deposit</h4>
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              </div>
              <div className="text-xl font-bold text-amber-600">
                ₹{(finalData?.fixedDeposit || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Returns: +₹{fdReturns.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Value Comparison Chart */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Final Value Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis 
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                  />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `₹${Number(value).toLocaleString('en-IN')}`,
                      name === 'sip' ? 'SIP' : 
                      name === 'lumpSum' ? 'Lump Sum' : 
                      name === 'stocks' ? 'Stocks' : 'Fixed Deposit'
                    ]}
                  />
                  <Bar dataKey="sip" fill="#10B981" name="SIP" />
                  <Bar dataKey="lumpSum" fill="#3B82F6" name="Lump Sum" />
                  <Bar dataKey="stocks" fill="#8B5CF6" name="Stocks" />
                  <Bar dataKey="fixedDeposit" fill="#F59E0B" name="Fixed Deposit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Value Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ₹${(value / 100000).toFixed(1)}L`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Value']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Returns Comparison */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Returns Analysis</h3>
              <div className="space-y-4">
                {returnsData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: item.color }}></div>
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          Invested: ₹{item.invested.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold" style={{ color: item.color }}>
                        +₹{item.returns.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {((item.returns / item.invested) * 100).toFixed(0)}% gain
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Insights</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-700">
                  <strong>Best Performer:</strong> {
                    Math.max(finalData?.sip || 0, finalData?.lumpSum || 0, finalData?.stocks || 0, finalData?.fixedDeposit || 0) === (finalData?.sip || 0) ? 'SIP' :
                    Math.max(finalData?.sip || 0, finalData?.lumpSum || 0, finalData?.stocks || 0, finalData?.fixedDeposit || 0) === (finalData?.lumpSum || 0) ? 'Lump Sum' :
                    Math.max(finalData?.sip || 0, finalData?.lumpSum || 0, finalData?.stocks || 0, finalData?.fixedDeposit || 0) === (finalData?.stocks || 0) ? 'Stocks' : 'Fixed Deposit'
                  } generates the highest returns over {timePeriod} years.
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Risk vs Return:</strong> Stocks offer highest potential but with higher volatility. SIP provides balanced growth with rupee cost averaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;