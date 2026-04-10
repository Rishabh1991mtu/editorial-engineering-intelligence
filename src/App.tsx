import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import KPICard from './components/KPICard';
import Timeline from './components/Timeline';
import ECRSimulation from './components/ECRSimulation';
import SimulationSummary from './components/SimulationSummary'; // No change needed here
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { immutableLaunchDate as fixedLaunchDate } from './mockData';

// Define a type for ECR items
export interface ECRItemType {
  id: string;
  number: string;
  title: string;
  description: string;
  days: number;
  impact: 'low' | 'moderate' | 'high';
}
// The import path for mockData.js needs to be explicit
const INITIAL_ECR_DATA: ECRItemType[] = [
  { id: 'ECR-001', number: '01', title: 'Sensor Array Refactor', description: 'Optimization of power consumption in deep space mode', days: 5, impact: 'low' },
  { id: 'ECR-002', number: '02', title: 'Kernel Patch 12.4', description: 'Critical vulnerability fix for telemetry stack', days: 8, impact: 'high' },
  { id: 'ECR-003', number: '03', title: 'Structural Frame Audit', description: 'Compliance check for revised thermal shielding', days: 12, impact: 'high' },
  { id: 'ECR-004', number: '04', title: 'Payload Integration', description: 'Wiring harness adjustment for secondary module', days: 20, impact: 'moderate' },
];

const BASE_PROJECT_DURATION = 180; // Days, as seen in SimulationSummary

export default function App() {
  const [ecrData, setEcrData] = useState<ECRItemType[]>(INITIAL_ECR_DATA);
  const [projectedEndDate, setProjectedEndDate] = useState('');
  const [overallImpact, setOverallImpact] = useState(0);
  const [overallImpactWarning, setOverallImpactWarning] = useState(false);

  useEffect(() => {
    const totalECRDays = ecrData.reduce((sum, ecr) => sum + ecr.days, 0);
    setOverallImpact(totalECRDays);
    setOverallImpactWarning(totalECRDays > 0); // Assuming any impact is a warning

    const currentProjectEndDate = new Date(fixedLaunchDate);
    currentProjectEndDate.setDate(currentProjectEndDate.getDate() + totalECRDays); // This line uses fixedLaunchDate
    setProjectedEndDate(currentProjectEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));

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
          <Timeline ecrData={ecrData} />

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
