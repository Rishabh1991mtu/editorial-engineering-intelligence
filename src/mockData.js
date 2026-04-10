// src/mockData.js
export const ecrData = [
  // Program A: "Powertrain" (Initial Critical Path)
  { id: 'ECR-P1', program: 'Powertrain', description: 'Engine Block Sourcing', duration: 30, cost: 250000, status: 'On Track', dependencies: [], affectedParts: ['12678901 (Block)', '12678902 (Bearing)'] },
  { id: 'ECR-P2', program: 'Powertrain', description: 'Brake System Integration', duration: 20, cost: 150000, status: 'At Risk', dependencies: ['ECR-P1'], affectedParts: ['12678903 (Caliper)', '12678904 (Pad)'] },
  { id: 'ECR-P3', program: 'Powertrain', description: 'Exhaust Finalization', duration: 10, cost: 80000, status: 'On Track', dependencies: ['ECR-P2'], affectedParts: ['12678905 (Muffler)'] },

  // Program B: "Chassis" (Has slack)
  { id: 'ECR-C1', program: 'Chassis', description: 'Frame Welding', duration: 25, cost: 180000, status: 'On Track', dependencies: [], affectedParts: ['12678906 (Frame)'] },
  { id: 'ECR-C2', program: 'Chassis', description: 'Suspension Assembly', duration: 15, cost: 120000, status: 'Blocked', dependencies: ['ECR-C1'], affectedParts: ['12678907 (Spring)', '12678908 (Strut)'] },

  // Program C: "Interior" (Low cost, has slack)
  { id: 'ECR-I1', program: 'Interior', description: 'Infotainment Install', duration: 10, cost: 95000, status: 'On Track', dependencies: [], affectedParts: ['12678909 (Screen)', '12678910 (Harness)'] }
];

export const projectStartDate = new Date("2026-04-10");
export const immutableLaunchDate = new Date("2026-06-19");