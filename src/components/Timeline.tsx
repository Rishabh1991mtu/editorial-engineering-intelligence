import { motion } from 'motion/react';
import { ECRItemType } from '../App';

interface TimelineProps {
  ecrData: ECRItemType[];
  highlightBlocked?: boolean;
}

const impactBgColorMap = {
  low: 'bg-blue-500',
  moderate: 'bg-orange-500',
  high: 'bg-red-600',
};

// Assuming a total project length for visualization purposes, e.g., 200 days
const TOTAL_TIMELINE_LENGTH_DAYS = 200;

export default function Timeline({ ecrData, highlightBlocked }: TimelineProps) {
  let cumulativeDays = 0;

  const timelineECRs = ecrData.map(ecr => {
    const widthPercentage = (ecr.days / TOTAL_TIMELINE_LENGTH_DAYS) * 100;
    const offsetPercentage = (cumulativeDays / TOTAL_TIMELINE_LENGTH_DAYS) * 100;
    cumulativeDays += ecr.days;

    return {
      id: ecr.id,
      duration: `${ecr.days}d`,
      width: `${widthPercentage}%`,
      offset: `${offsetPercentage}%`,
      color: impactBgColorMap[ecr.impact],
      status: ecr.status
    };
  });

  return (
    <div className="relative bg-surface-container-low rounded-2xl p-10 h-32 flex items-center overflow-hidden border border-slate-200 dark:border-slate-800">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 flex justify-between px-10 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-full border-l border-outline" />
        ))}
      </div>

      {/* Bars */}
      <div className="w-full flex flex-col gap-6 relative z-10">
        {timelineECRs.map((ecr, index) => (
          <motion.div 
            key={ecr.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center" 
            style={{ marginLeft: ecr.offset }}
          >
            <div className={`
              ${ecr.color} 
              h-8 rounded-full shadow-sm flex items-center px-4 overflow-hidden min-w-fit
              ${highlightBlocked && ecr.status !== 'Blocked' ? 'opacity-30' : 'opacity-100'}
              ${ecr.status === 'Blocked' ? 'border-2 border-dashed border-white' : ''} // Fallback for stripes
            `} style={{ width: ecr.width }}>
              <span className="text-[10px] text-white font-bold whitespace-nowrap">
                {ecr.id} ({ecr.duration})
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      {label}
    </div>
  );
}
