import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../lib/utils';
import { Download, Share2, Printer } from 'lucide-react';
import { cn } from '../../lib/utils';

export const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const calculateSIP = () => {
    const p = monthlyInvestment;
    const i = expectedReturn / 100 / 12;
    const n = timePeriod * 12;
    
    // SIP Formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    const maturityAmount = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvestment = p * n;
    const estimatedReturns = maturityAmount - totalInvestment;

    return {
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      maturityAmount: Math.round(maturityAmount)
    };
  };

  const results = calculateSIP();

  const chartData = [
    { name: 'Total Investment', value: results.totalInvestment, color: '#0d9488' },
    { name: 'Estimated Returns', value: results.estimatedReturns, color: '#6366f1' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Monthly Investment</label>
            <span className="text-teal-600 font-bold">{formatCurrency(monthlyInvestment)}</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="100000" 
            step="500"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Expected Return Rate (p.a)</label>
            <span className="text-teal-600 font-bold">{expectedReturn}%</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="30" 
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Time Period (Years)</label>
            <span className="text-teal-600 font-bold">{timePeriod} Yr</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="40" 
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Invested Amount</p>
            <p className="text-xl font-black text-slate-700 dark:text-slate-200">{formatCurrency(results.totalInvestment)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50">
            <p className="text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-1">Est. Returns</p>
            <p className="text-xl font-black text-indigo-700 dark:text-indigo-300">{formatCurrency(results.estimatedReturns)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50">
            <p className="text-[10px] uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold mb-1">Total Value</p>
            <p className="text-xl font-black text-teal-700 dark:text-teal-300">{formatCurrency(results.maturityAmount)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
