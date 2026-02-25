import { 
  Calculator, 
  Percent, 
  HeartPulse, 
  Briefcase, 
  Wrench, 
  Home, 
  TrendingUp, 
  Scale, 
  Calendar, 
  Lock, 
  Clock, 
  Dna,
  Zap,
  Activity,
  DollarSign,
  PieChart,
  Stethoscope,
  Baby,
  Timer
} from 'lucide-react';

export type CalculatorCategory = 'Basic' | 'Finance' | 'Health' | 'Utility';

export interface CalculatorInfo {
  id: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  icon: any;
  path: string;
}

export const CALCULATORS: CalculatorInfo[] = [
  {
    id: 'standard',
    name: 'Standard Calculator',
    description: 'Basic arithmetic operations with memory functions.',
    category: 'Basic',
    icon: Calculator,
    path: 'standard'
  },
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    description: 'Advanced mathematical functions including trigonometry and logs.',
    category: 'Basic',
    icon: Zap,
    path: 'scientific'
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'Calculate monthly installments for home, car, or personal loans.',
    category: 'Finance',
    icon: Home,
    path: 'emi'
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    description: 'Estimate returns on Systematic Investment Plans with step-up options.',
    category: 'Finance',
    icon: TrendingUp,
    path: 'sip'
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    description: 'Calculate GST inclusive and exclusive amounts with tax slabs.',
    category: 'Finance',
    icon: Percent,
    path: 'gst'
  },
  {
    id: 'fd',
    name: 'FD Calculator',
    description: 'Calculate maturity amount for Fixed Deposits.',
    category: 'Finance',
    icon: DollarSign,
    path: 'fd'
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Check your Body Mass Index and health category.',
    category: 'Health',
    icon: HeartPulse,
    path: 'bmi'
  },
  {
    id: 'bmr',
    name: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate for calorie planning.',
    category: 'Health',
    icon: Activity,
    path: 'bmr'
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Find your exact age in years, months, and days.',
    category: 'Health',
    icon: Baby,
    path: 'age'
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentage increase, decrease, and more.',
    category: 'Utility',
    icon: Percent,
    path: 'percentage'
  },
  {
    id: 'password',
    name: 'Password Generator',
    description: 'Generate strong, secure, and memorable passwords.',
    category: 'Utility',
    icon: Lock,
    path: 'password'
  },
  {
    id: 'date',
    name: 'Date Calculator',
    description: 'Calculate difference between dates or add/subtract days.',
    category: 'Utility',
    icon: Calendar,
    path: 'date'
  }
];
