import { LayoutDashboard, Users, Gavel, Settings, Plus, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-100 dark:bg-slate-800 flex flex-col py-8 pt-24 z-40 border-r border-slate-200 dark:border-slate-700">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <Compass className="text-white w-4 h-4" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-blue-950 dark:text-white leading-tight">Program Alpha</h2>
            <p className="text-xs text-slate-500 font-body">Engineering Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 font-body text-sm font-medium">
        <NavItem icon={<LayoutDashboard size={18} />} label="Program Overview" active />
        <NavItem icon={<Users size={18} />} label="Resource Analysis" />
        <NavItem icon={<Gavel size={18} />} label="Risk Ledger" />
        <NavItem icon={<Settings size={18} />} label="Settings" />
      </nav>

      <div className="px-4 mt-auto">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          New Simulation
        </motion.button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode, label: string, active?: boolean }) {
  return (
    <motion.a
      href="#"
      whileHover={{ x: 4 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-white dark:bg-slate-700 text-blue-900 dark:text-blue-100 shadow-sm' 
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.a>
  );
}
