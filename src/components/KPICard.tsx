import { AlertTriangle } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string;
  subtext: string;
  accentColor: string;
  warning?: boolean;
}

export default function KPICard({ label, value, subtext, accentColor, warning }: KPICardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl relative overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColor}`}></div>
      <div className="flex flex-col h-full justify-between gap-4">
        <span className="text-[0.65rem] uppercase tracking-[0.1em] font-bold text-slate-500 dark:text-slate-400 font-label">
          {label}
        </span>
        <div className="flex flex-col">
          <span className={`text-3xl md:text-4xl font-headline font-bold ${warning ? 'text-tertiary-container' : 'text-primary dark:text-white'}`}>
            {value}
          </span>
          <span className={`text-xs mt-1 font-body flex items-center gap-1 ${warning ? 'text-tertiary-container/80 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
            {warning && <AlertTriangle size={12} />}
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
}
