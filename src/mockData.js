// src/mockData.js
export const ecrData = [
  // Program A: The "Engine Program" - This is the initial critical path.
  { id: 'ECR-P1', program: 'Engine', description: 'Engine Block Sourcing', duration: 30, priority: 1 },
  { id: 'ECR-P2', program: 'Engine', description: 'Brake System Integration', duration: 20, priority: 1 },

  // Program B: The "Chassis Program" - This program has 10 days of "float" or "slack".
  { id: 'ECR-C1', program: 'Chassis', description: 'Frame Welding', duration: 25, priority: 2 },
  { id: 'ECR-C2', program: 'Chassis', description: 'Suspension Assembly', duration: 15, priority: 2 }
];

export const immutableLaunchDate = new Date("2026-10-01");