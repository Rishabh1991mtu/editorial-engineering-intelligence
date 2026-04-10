import { Rocket, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function SimulationSummary() {
  return (
    <div className="bg-primary text-white rounded-2xl p-8 sticky top-24 shadow-2xl shadow-primary/30 border border-primary-container">
      <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
        <Rocket size={24} className="text-primary-fixed-dim" />
        Simulation Summary
      </h3>
      
      <div className="space-y-6">
        <SummaryRow label="Base Duration" value="180 Days" />
        <SummaryRow label="ECR Cumulative" value="67 Days" />
        <SummaryRow label="Parallel Offset" value="-58 Days" />

        <div className="pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase text-primary-fixed-dim">Health Confidence</span>
            <span className="text-xs font-bold">64%</span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '64%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-secondary-fixed" 
            />
          </div>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-10 py-4 bg-white text-primary font-bold rounded-xl hover:bg-primary-fixed transition-colors shadow-lg flex items-center justify-center gap-2"
      >
        <Zap size={18} />
        Apply Simulation Logic
      </motion.button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/10 pb-4">
      <span className="text-sm font-label uppercase tracking-widest text-primary-fixed-dim">{label}</span>
      <span className="text-2xl font-headline font-bold">{value}</span>
    </div>
  );
}
