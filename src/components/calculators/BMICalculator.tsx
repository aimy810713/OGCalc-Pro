import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Info, AlertCircle, CheckCircle2 } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const calculateBMI = () => {
    let bmiValue = 0;
    if (unit === 'metric') {
      bmiValue = weight / ((height / 100) * (height / 100));
    } else {
      // Imperial logic if needed
      bmiValue = (weight * 703) / (height * height);
    }
    return parseFloat(bmiValue.toFixed(1));
  };

  const bmi = calculateBMI();

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-500', info: 'You may need to eat more nutrient-dense foods.' };
    if (val < 25) return { label: 'Normal', color: 'text-green-500', bg: 'bg-green-500', info: 'Great job! You are in a healthy weight range.' };
    if (val < 30) return { label: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-500', info: 'Consider increasing physical activity and balanced diet.' };
    return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-500', info: 'It is recommended to consult with a healthcare provider.' };
  };

  const category = getCategory(bmi);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Weight (kg)</label>
            <span className="text-teal-600 font-bold">{weight} kg</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="200" 
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Height (cm)</label>
            <span className="text-teal-600 font-bold">{height} cm</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="250" 
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">BMI Scale</h4>
          <div className="relative h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: '18.5%' }} />
            <div className="h-full bg-green-500" style={{ width: '6.5%' }} />
            <div className="h-full bg-yellow-500" style={{ width: '5%' }} />
            <div className="h-full bg-red-500" style={{ width: '70%' }} />
            
            <motion.div 
              className="absolute top-0 w-1 h-full bg-white shadow-lg z-10"
              animate={{ left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40+</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center p-8 rounded-[2.5rem] bg-gradient-to-br from-teal-500/10 to-indigo-500/10 border border-teal-500/20">
        <p className="text-slate-500 font-medium mb-2">Your Body Mass Index</p>
        <motion.h2 
          key={bmi}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl font-black text-slate-900 dark:text-white mb-4"
        >
          {bmi}
        </motion.h2>
        <div className={cn("px-6 py-2 rounded-full text-white font-bold text-sm mb-6 shadow-lg", category.bg)}>
          {category.label}
        </div>
        
        <div className="flex items-start gap-3 text-left p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <Info className="text-teal-500 shrink-0" size={20} />
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {category.info}
          </p>
        </div>
      </div>
    </div>
  );
};
