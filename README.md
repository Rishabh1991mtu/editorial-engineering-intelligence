# Strategic OEM Dashboard Simulation

This project is a React-based strategic decision-making dashboard for OEM leadership. It simulates the impact of Engineering Change Requests (ECRs) on program timelines, costs, and overall health.

## Prerequisite

- Node.js (v18 or higher recommended)
- npm or yarn

## Dependencies

The project relies on the following key libraries:

- **React 19**: Core UI library.
- **Vite 6**: Fast build tool and dev server.
- **Lucide React**: For iconography.
- **Motion (Framer Motion)**: For smooth animations and transitions.
- **Tailwind CSS 4**: For utility-first styling.
- **Google Gen AI SDK**: For future conversational intelligence integration.

## Getting Started

### 1. Install Dependencies

Navigate to the project directory and install the required packages:

```bash
npm install
```

### 2. Run the Development Server

Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000/`.

### 3. Build for Production

To create an optimized production build:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

## Project Structure

- `src/App.tsx`: Main application component containing simulation logic and layout.
- `src/mockData.js`: Enriched data source for ECRs and program dates.
- `src/components/`: Folder containing reusable UI components (Timeline, ECRSimulation, KPICard, etc.).
- `SOLUTION_ARCHITECTURE.md`: Contains the solution architecture and business impact summary.
