import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import KPICard from './components/KPICard';
import Timeline from './components/Timeline';
import ECRSimulation from './components/ECRSimulation';
import SimulationSummary from './components/SimulationSummary'; // No change needed here
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { immutableLaunchDate as fixedLaunchDate, projectStartDate, ecrData as mockECRData } from './mockData';

// Define a type for ECR items
export interface ECRItemType {
  id: string;
  number: string;
  title: string;
  description: string;
  days: number;
  impact: 'low' | 'moderate' | 'high';
  program: string;
  cost: number;
  status: 'On Track' | 'At Risk' | 'Blocked';
  dependencies: string[];
  affectedParts: string[];
}

const INITIAL_ECR_DATA: ECRItemType[] = mockECRData.map((ecr, index) => ({
  id: ecr.id,
  number: String(index + 1).padStart(2, '0'),
  title: ecr.description,
  description: ecr.description,
  days: ecr.duration,
  impact: ecr.status === 'Blocked' ? 'high' : ecr.status === 'At Risk' ? 'moderate' : 'low',
  program: ecr.program,
  cost: ecr.cost,
  status: ecr.status as 'On Track' | 'At Risk' | 'Blocked',
  dependencies: ecr.dependencies,
  affectedParts: ecr.affectedParts
}));

const BASE_PROJECT_DURATION = 180; // Days, as seen in SimulationSummary

export default function App() {
  const [ecrData, setEcrData] = useState<ECRItemType[]>(INITIAL_ECR_DATA);
  const [highlightBlocked, setHighlightBlocked] = useState(false);

  const { criticalPathDuration, projectedEndDate, overallImpact, overallImpactWarning, groupedPrograms, totalCost, criticalProgram }: {
    criticalPathDuration: number;
    projectedEndDate: string;
    overallImpact: number;
    overallImpactWarning: boolean;
    groupedPrograms: { [key: string]: ECRItemType[] };
    totalCost: number;
    criticalProgram: string;
  } = useMemo(() => {
    // Group by Program
    const groups: { [key: string]: ECRItemType[] } = {};
    ecrData.forEach(ecr => {
      if (!groups[ecr.program]) {
        groups[ecr.program] = [];
      }
      groups[ecr.program].push(ecr);
    });

    // Calculate Each Program's Duration
    const programDurations: { [key: string]: number } = {};
    for (const program in groups) {
      programDurations[program] = groups[program].reduce((sum, ecr) => sum + ecr.days, 0);
    }

    // Find the Critical Path
    const durations = Object.entries(programDurations);
    durations.sort((a, b) => b[1] - a[1]);
    const maxDuration = durations.length > 0 ? durations[0][1] : 0;
    const criticalProg = durations.length > 0 ? durations[0][0] : '';

    const totalDuration = maxDuration;

    const currentProjectEndDate = new Date(projectStartDate);
    currentProjectEndDate.setDate(currentProjectEndDate.getDate() + totalDuration);
    
    // Question 2: Cost Analysis
    const cost = ecrData.reduce((sum, ecr) => {
      return ecr.days > 0 ? sum + ecr.cost : sum;
    }, 0);

    const daysPastDeadline = Math.max(0, Math.ceil((currentProjectEndDate.getTime() - new Date(fixedLaunchDate).getTime()) / (1000 * 60 * 60 * 24)));

    return {
      criticalPathDuration: totalDuration,
      projectedEndDate: currentProjectEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      overallImpact: daysPastDeadline,
      overallImpactWarning: daysPastDeadline > 0,
      groupedPrograms: groups,
      totalCost: cost,
      criticalProgram: criticalProg
    };
  }, [ecrData]);

  const updateEcrDays = (id: string, newDays: number) => {
    setEcrData(prevData =>
      prevData.map(ecr => (ecr.id === id ? { ...ecr, days: newDays } : ecr))
    );
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
      <TopBar />
      <div className="flex pt-20">
        <Sidebar />
        
        <main className="ml-64 flex-1 p-12 min-h-screen">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-headline font-light text-on-surface mb-2">Program Health</h1>
            <p className="text-on-surface-variant font-body tracking-tight">
              Real-time simulation of Engineering Change Requests (ECR) impact on final delivery.
            </p>
          </motion.div>

          {/* KPI Panel */}
            <section className="sticky top-0 z-20 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 bg-background py-4 shadow-sm -mx-4 px-4">
            <KPICard 
              label="Project Start Date" 
              value={new Date(projectStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
              subtext="Simulation baseline" 
              accentColor="bg-slate-500" 
              valueColor="text-blue-600"
            />
            <KPICard 
              label="Projected End Date" 
              value={projectedEndDate} 
              subtext="Based on current simulation data" 
              accentColor="bg-primary" 
            />
            <KPICard 
              label="Fixed Launch Date" 
              value={new Date(fixedLaunchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
              subtext="Institutional deadline" 
              accentColor="bg-secondary" 
              valueColor="text-red-600"
            />
            <KPICard 
              label="Overall Impact" 
              value={`+${overallImpact} days`} 
              subtext="Critical Path Delay" 
              accentColor="bg-tertiary-container" 
              warning={overallImpactWarning}
            />
            <KPICard 
              label="Total Program Cost" 
              value={`$${(totalCost / 1000).toFixed(0)}k`} 
              subtext="Active tasks cost" 
              accentColor="bg-tertiary" 
            />
              <KPICard
                label="Program Health"
                value={`${Math.max(0, 100 - overallImpact * 2)}%`}
                subtext="Confidence score"
                accentColor={overallImpact > 0 ? "bg-red-500" : "bg-green-500"}
              />
          </section>

          {/* ECR Timeline Visualization */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-headline font-medium text-on-surface">Timeline Projection</h2>
            <label className="flex items-center gap-2 text-sm text-on-surface-variant font-body">
              <input 
                type="checkbox" 
                checked={highlightBlocked} 
                onChange={(e) => setHighlightBlocked(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              Highlight Blocked Tasks
            </label>
          </div>

          <div className="space-y-8 mb-16">
            {Object.entries(groupedPrograms).map(([programName, programECRs]) => (
              <div key={programName} className={`program-group p-6 rounded-2xl border ${programName === criticalProgram ? 'border-red-500 bg-red-50/10' : 'border-slate-100'}`}>
                <h3 className="text-lg font-headline font-medium text-on-surface mb-4 flex items-center justify-between">
                  {programName} Program
                  {programName === criticalProgram && (
                    <span className="text-xs font-bold uppercase text-red-600 bg-red-100 px-2 py-0.5 rounded">Critical Path</span>
                  )}
                </h3>
                <Timeline ecrData={programECRs} highlightBlocked={highlightBlocked} />
              </div>
            ))}
          </div>

          {/* Simulation Panel */}
          <section className="mt-12">
              <h2 className="text-2xl font-headline font-medium text-on-surface mb-8">Active ECR Simulation</h2>
              <ECRSimulation ecrData={ecrData} onUpdateEcrDays={updateEcrDays} />
            </section>
        </main>
      </div>

      {/* Floating UI Helper */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-all"
        >
          <Zap size={24} />
        </motion.button>
      </div>
    </div>
  );
}
