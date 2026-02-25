import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency, formatNumber } from '../../lib/utils';
import confetti from 'canvas-confetti';
import { Download, Share2, Printer, Info } from 'lucide-react';

export const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(10);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  const calculateEMI = () => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureType === 'years' ? tenure * 12 : tenure;
    
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  };

  const results = calculateEMI();

  const chartData = [
    { name: 'Principal Loan Amount', value: loanAmount, color: '#0d9488' },
    { name: 'Total Interest', value: results.totalInterest, color: '#6366f1' }
  ];

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#6366f1', '#f59e0b']
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Loan Amount</label>
            <span className="text-teal-600 font-bold">{formatCurrency(loanAmount)}</span>
          </div>
          <input 
            type="range" 
            min="100000" 
            max="10000000" 
            step="50000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <div className="flex justify-between mt-1 text-[10px] text-slate-400">
            <span>1L</span>
            <span>1Cr</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Interest Rate (p.a)</label>
            <span className="text-teal-600 font-bold">{interestRate}%</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="20" 
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <div className="flex justify-between mt-1 text-[10px] text-slate-400">
            <span>1%</span>
            <span>20%</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Loan Tenure</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setTenureType('years')}
                className={cn("px-2 py-1 text-xs rounded-md", tenureType === 'years' ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800")}
              >Yr</button>
              <button 
                onClick={() => setTenureType('months')}
                className={cn("px-2 py-1 text-xs rounded-md", tenureType === 'months' ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800")}
              >Mo</button>
            </div>
          </div>
          <input 
            type="range" 
            min="1" 
            max={tenureType === 'years' ? 30 : 360} 
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <div className="flex justify-between mt-1 text-[10px] text-slate-400">
            <span>1 {tenureType}</span>
            <span>{tenureType === 'years' ? 30 : 360} {tenureType}</span>
          </div>
        </div>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50">
            <p className="text-[10px] uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold mb-1">Monthly EMI</p>
            <p className="text-xl font-black text-teal-700 dark:text-teal-300">{formatCurrency(results.emi)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50">
            <p className="text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-1">Total Interest</p>
            <p className="text-xl font-black text-indigo-700 dark:text-indigo-300">{formatCurrency(results.totalInterest)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Total Payment</p>
            <p className="text-xl font-black text-slate-700 dark:text-slate-200">{formatCurrency(results.totalPayment)}</p>
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

        <div className="flex gap-4 mt-8">
          <button 
            onClick={handleCelebrate}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all active:scale-95 shadow-lg"
          >
            <Download size={18} />
            <span>Download PDF</span>
          </button>
          <button className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            <Share2 size={18} />
          </button>
          <button className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            <Printer size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

import { cn } from '../../lib/utils';
