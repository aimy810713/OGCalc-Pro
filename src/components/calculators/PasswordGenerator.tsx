import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, RefreshCw, Check, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let characters = '';
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (characters === '') return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: 'Weak', color: 'bg-red-500', icon: ShieldAlert };
    if (length < 12) return { label: 'Medium', color: 'bg-yellow-500', icon: Shield };
    return { label: 'Strong', color: 'bg-green-500', icon: ShieldCheck };
  };

  const strength = getStrength();

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="relative group">
        <input 
          type="text" 
          readOnly 
          value={password || 'Click Generate'}
          className="w-full px-6 py-5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xl font-mono text-slate-700 dark:text-slate-200 border-2 border-transparent focus:border-teal-500 outline-none transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
          <button 
            onClick={generatePassword}
            className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-500"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={copyToClipboard}
            className="p-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all active:scale-95"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Password Length</label>
              <span className="text-teal-600 font-bold">{length}</span>
            </div>
            <input 
              type="range" 
              min="4" 
              max="50" 
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(options).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setOptions({ ...options, [key]: !val })}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-sm font-bold",
                  val 
                    ? "bg-teal-50 dark:bg-teal-900/20 border-teal-500 text-teal-600 dark:text-teal-400" 
                    : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400"
                )}
              >
                <span className="capitalize">{key}</span>
                <div className={cn("w-4 h-4 rounded-full border-2", val ? "bg-teal-500 border-teal-500" : "border-slate-300")} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <strength.icon size={48} className={cn("mb-4", strength.color.replace('bg-', 'text-'))} />
          <h4 className="text-lg font-bold mb-1">Security Strength</h4>
          <div className={cn("px-4 py-1 rounded-full text-white text-xs font-bold mb-4", strength.color)}>
            {strength.label}
          </div>
          <p className="text-xs text-slate-500 text-center">
            A strong password contains at least 12 characters including symbols and numbers.
          </p>
        </div>
      </div>

      <button 
        onClick={generatePassword}
        className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all active:scale-[0.98] shadow-xl"
      >
        Generate Secure Password
      </button>
    </div>
  );
};
