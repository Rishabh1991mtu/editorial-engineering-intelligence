import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import KPICard from './components/KPICard';
import Timeline from './components/Timeline';
import ECRSimulation from './components/ECRSimulation';
import SimulationSummary from './components/SimulationSummary'; // No change needed here
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { immutableLaunchDate as fixedLaunchDate, ecrData as mockECRData } from './mockData';

// Define a type for ECR items
export interface ECRItemType {
  id: string;
  number: string;
  title: string;
  description: string;
  days: number;
  impact: 'low' | 'moderate' | 'high';
  program: string;
}

const INITIAL_ECR_DATA: ECRItemType[] = mockECRData.map((ecr, index) => ({
  id: ecr.id,
  number: String(index + 1).padStart(2, '0'),
  title: ecr.description,
  description: ecr.description,
  days: ecr.duration,
  impact: ecr.priority === 1 ? 'high' : ecr.priority === 2 ? 'moderate' : 'low',
  program: ecr.program
}));

const BASE_PROJECT_DURATION = 180; // Days, as seen in SimulationSummary

export default function App() {
  const [ecrData, setEcrData] = useState<ECRItemType[]>(INITIAL_ECR_DATA);

  const { criticalPathDuration, projectedEndDate, overallImpact, overallImpactWarning, groupedPrograms }: {
    criticalPathDuration: number;
    projectedEndDate: string;
    overallImpact: number;
    overallImpactWarning: boolean;
    groupedPrograms: { [key: string]: ECRItemType[] };
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
    const durations = Object.values(programDurations);
    const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;

    const totalDuration = maxDuration;

    const currentProjectEndDate = new Date(fixedLaunchDate);
    currentProjectEndDate.setDate(currentProjectEndDate.getDate() + totalDuration);
    
    return {
      criticalPathDuration: totalDuration,
      projectedEndDate: currentProjectEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      overallImpact: totalDuration,
      overallImpactWarning: totalDuration > 0,
      groupedPrograms: groups
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
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <KPICard 
              label="Projected End Date" 
              value={projectedEndDate} 
              subtext="Based on current simulation data" 
              accentColor="bg-primary" 
            />
            <KPICard 
              label="Fixed Launch Date" 
              value="Oct 01, 2026" 
              subtext="Institutional deadline" 
              accentColor="bg-secondary" 
            />
            <KPICard 
              label="Overall Impact" 
              value={`+${overallImpact} days`} 
              subtext="Critical Path Delay" 
              accentColor="bg-tertiary-container" 
              warning={overallImpactWarning}
            />
          </section>

          {/* ECR Timeline Visualization */}
          <div className="space-y-8 mb-16">
            {Object.entries(groupedPrograms).map(([programName, programECRs]) => (
              <div key={programName} className="program-group">
                <h3 className="text-lg font-headline font-medium text-on-surface mb-2">{programName} Program</h3>
                <Timeline ecrData={programECRs} />
              </div>
            ))}
          </div>

          {/* Simulation Panel */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-headline font-medium text-on-surface mb-8">Active ECR Simulation</h2>
              <ECRSimulation ecrData={ecrData} onUpdateEcrDays={updateEcrDays} />
            </div>
            <div className="lg:col-span-4">
              <SimulationSummary 
                baseDuration={BASE_PROJECT_DURATION} 
                cumulativeImpact={overallImpact} 
                parallelOffset={0} 
                healthConfidence={Math.max(0, 100 - overallImpact * 2)} 
              />
            </div>
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
