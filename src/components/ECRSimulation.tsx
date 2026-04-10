import { Minus, Plus } from 'lucide-react';
import { ECRItemType } from '../App'; // Import ECRItemType from App.tsx

interface ECRItemProps {
  id: string;
  number: string;
  title: string;
  description: string;
  ecr: ECRItemType; // Pass the whole ECR object
  onUpdateEcrDays: (id: string, newDays: number) => void;
  impactColorClass: string; // Pass the color class based on impact
}

function ECRItem({ ecr, onUpdateEcrDays, impactColorClass }: ECRItemProps) {
  const { id, number, title, description, days } = ecr;

  const handleDaysChange = (change: number) => {
    onUpdateEcrDays(id, Math.max(0, days + change));
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="flex items-center gap-6">
        <div className={`w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center ${impactColorClass} font-bold shadow-sm`}>
          {number}
        </div>
        <div>
          <h4 className="font-bold text-primary dark:text-white">{id}: {title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
          <button 
            onClick={() => handleDaysChange(-1)}
            className="px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300"
          >
            <Minus size={14} />
          </button>
          <span className="w-12 text-center font-bold text-sm dark:text-white">{days}</span>
          <button 
            onClick={() => handleDaysChange(1)}
            className="px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300"
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase w-12">Days</span>
      </div>
    </div>
  );
}

interface ECRSimulationProps {
  ecrData: ECRItemType[];
  onUpdateEcrDays: (id: string, newDays: number) => void;
}

const impactColorMap = {
  low: 'text-blue-500',
  moderate: 'text-orange-500',
  high: 'text-red-600',
};

export default function ECRSimulation({ ecrData, onUpdateEcrDays }: ECRSimulationProps) {
  return (
    <div className="space-y-4">
      {ecrData.map(ecr => (
        <ECRItem
          key={ecr.id}
          ecr={ecr}
          onUpdateEcrDays={onUpdateEcrDays}
          impactColorClass={impactColorMap[ecr.impact]}
        />
      ))}
    </div>
  );
}
