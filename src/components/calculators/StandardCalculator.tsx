import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const StandardCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || shouldReset) {
      setDisplay(num);
      setShouldReset(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setShouldReset(true);
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
      setShouldReset(true);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    { label: 'AC', action: clear, type: 'special' },
    { label: '+/-', action: () => setDisplay(String(Number(display) * -1)), type: 'special' },
    { label: '%', action: () => setDisplay(String(Number(display) / 100)), type: 'special' },
    { label: '÷', action: () => handleOperator('/'), type: 'operator' },
    { label: '7', action: () => handleNumber('7'), type: 'number' },
    { label: '8', action: () => handleNumber('8'), type: 'number' },
    { label: '9', action: () => handleNumber('9'), type: 'number' },
    { label: '×', action: () => handleOperator('*'), type: 'operator' },
    { label: '4', action: () => handleNumber('4'), type: 'number' },
    { label: '5', action: () => handleNumber('5'), type: 'number' },
    { label: '6', action: () => handleNumber('6'), type: 'number' },
    { label: '-', action: () => handleOperator('-'), type: 'operator' },
    { label: '1', action: () => handleNumber('1'), type: 'number' },
    { label: '2', action: () => handleNumber('2'), type: 'number' },
    { label: '3', action: () => handleNumber('3'), type: 'number' },
    { label: '+', action: () => handleOperator('+'), type: 'operator' },
    { label: '0', action: () => handleNumber('0'), type: 'number', wide: true },
    { label: '.', action: () => handleNumber('.'), type: 'number' },
    { label: '=', action: calculate, type: 'operator' },
  ];

  return (
    <div className="max-w-xs mx-auto bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl border-4 border-slate-800">
      <div className="mb-6 px-4 py-8 text-right bg-slate-800/50 rounded-2xl overflow-hidden">
        <div className="text-slate-500 text-xs h-4 mb-1 font-mono">{equation}</div>
        <div className="text-white text-4xl font-light tracking-tighter truncate font-mono">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className={cn(
              "h-14 rounded-2xl text-lg font-medium transition-all active:scale-90 flex items-center justify-center",
              btn.wide ? "col-span-2" : "col-span-1",
              btn.type === 'number' && "bg-slate-800 text-white hover:bg-slate-700",
              btn.type === 'operator' && "bg-teal-600 text-white hover:bg-teal-500",
              btn.type === 'special' && "bg-slate-700 text-slate-300 hover:bg-slate-600"
            )}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
