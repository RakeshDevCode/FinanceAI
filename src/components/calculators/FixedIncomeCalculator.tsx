import React, { useState, useEffect } from 'react';
import { Calculator, Shield, TrendingUp, IndianRupee, Percent } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FixedIncomeData {
  year: number;
  fdValue: number;
  bondValue: number;
  equityValue: number;
}

const FixedIncomeCalculator: React.FC = () => {
  const [investment, setInvestment] = useState(500000);
  const [fdRate, setFdRate] = useState(6.5);
  const [bondRate, setBondRate] = useState(7.2);
  const [equityRate, setEquityRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [data, setData] = useState<FixedIncomeData[]>([]);

  const calculateReturns = () => {
    const chartData: FixedIncomeData[] = [];
    
    for (let year = 1; year <= timePeriod; year++) {
      const fdValue = investment * Math.pow(1 + fdRate / 100, year);
      const bondValue = investment * Math.pow(1 + bondRate / 100, year);
      const equityValue = investment * Math.pow(1 + equityRate / 100, year);
      
      chartData.push({
        year,
        fdValue: Math.round(fdValue),
        bondValue: Math.round(bondValue),
        equityValue: Math.round(equityValue),
      });
    }
    
    setData(chartData);
  };

  useEffect(() => {
    calculateReturns();
  }, [investment, fdRate, bondRate, equityRate, timePeriod]);

  const finalData = data[data.length - 1];
  const fdFinal = finalData?.fdValue || 0;
  const bondFinal = finalData?.bondValue || 0;
  const equityFinal = finalData?.equityValue || 0;

  const fdReturn = fdFinal - investment;
  const bondReturn = bondFinal - investment;
  const equityReturn = equityFinal - investment;

  const pieData = [
    { name: 'Fixed Deposit', value: fdFinal, color: '#F59E0B' },
    { name: 'Government Bonds', value: bondFinal, color: '#3B82F6' },
    { name: 'Equity Funds', value: equityFinal, color: '#10B981' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl">
            <Calculator className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fixed Income Calculator</h1>
        <p className="text-gray-600">Compare returns across different investment instruments</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Investment Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="500000"
                  />
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹50K</span>
                  <span>₹50L</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fixed Deposit Rate (%)
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                  <input
                    type="number"
                    value={fdRate}
                    onChange={(e) => setFdRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="6.5"
                    step="0.1"
                  />
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="0.1"
                  value={fdRate}
                  onChange={(e) => setFdRate(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3%</span>
                  <span>15%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Government Bond Rate (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                  <input
                    type="number"
                    value={bondRate}
                    onChange={(e) => setBondRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="7.2"
                    step="0.1"
                  />
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.1"
                  value={bondRate}
                  onChange={(e) => setBondRate(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4%</span>
                  <span>12%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equity Return Rate (%)
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  <input
                    type="number"
                    value={equityRate}
                    onChange={(e) => setEquityRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="12"
                    step="0.5"
                  />
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="0.5"
                  value={equityRate}
                  onChange={(e) => setEquityRate(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5%</span>
                  <span>25%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Period (Years)
                </label>
                <div className="relative">
                  <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">Fixed Deposit</h4>
                <Shield className="h-5 w-5 text-amber-600" />
              </div>
              <div className="text-xl font-bold text-amber-600">
                ₹{fdFinal.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-green-600 mt-1">
                +₹{fdReturn.toLocaleString('en-IN')} returns
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">Government Bonds</h4>
                <Percent className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-blue-600">
                ₹{bondFinal.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-green-600 mt-1">
                +₹{bondReturn.toLocaleString('en-IN')} returns
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">Equity Funds</h4>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-xl font-bold text-green-600">
                ₹{equityFinal.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-green-600 mt-1">
                +₹{equityReturn.toLocaleString('en-IN')} returns
              </div>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.slice(-Math.min(10, data.length))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                  />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `₹${Number(value).toLocaleString('en-IN')}`,
                      name === 'fdValue' ? 'Fixed Deposit' : 
                      name === 'bondValue' ? 'Government Bonds' : 'Equity Funds'
                    ]}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Bar dataKey="fdValue" fill="#F59E0B" name="Fixed Deposit" />
                  <Bar dataKey="bondValue" fill="#3B82F6" name="Government Bonds" />
                  <Bar dataKey="equityValue" fill="#10B981" name="Equity Funds" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asset Allocation Pie Chart */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Final Value Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk vs Return Analysis */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk vs Return Analysis</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-amber-700">Fixed Deposit</div>
                <div className="text-xs text-gray-600 mt-1">Low Risk • Guaranteed Returns</div>
                <div className="mt-2 text-lg font-bold text-amber-600">{fdRate}% p.a.</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-700">Government Bonds</div>
                <div className="text-xs text-gray-600 mt-1">Low Risk • Fixed Returns</div>
                <div className="mt-2 text-lg font-bold text-blue-600">{bondRate}% p.a.</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-700">Equity Funds</div>
                <div className="text-xs text-gray-600 mt-1">High Risk • Variable Returns</div>
                <div className="mt-2 text-lg font-bold text-green-600">{equityRate}% p.a.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedIncomeCalculator;