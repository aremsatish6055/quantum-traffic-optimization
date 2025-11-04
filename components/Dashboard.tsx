import React, { useState } from 'react';
import useTrafficSimulation from '../hooks/useTrafficSimulation';
import TrafficGrid from './TrafficGrid';
import ControlPanel from './ControlPanel';
import StatsPanel from './StatsPanel';
import QuantumOptimizerPanel from './QuantumOptimizerPanel';
import Header from './Header';
import { Intersection } from '../types';
import ManualOverridePanel from './ManualOverridePanel';
import LogPanel from './LogPanel';
import AdvancedSettingsPanel from './AdvancedSettingsPanel';

const Dashboard: React.FC = () => {
    const { 
        isRunning, 
        setIsRunning,
        simulationSpeed,
        setSimulationSpeed,
        weather,
        setWeather,
        intersections, 
        vehicles, 
        stats,
        logs, 
        toggleEmergency, 
        applyQuantumOptimization,
        setLightStateManually,
        returnToAuto
    } = useTrafficSimulation();

    const [selectedIntersection, setSelectedIntersection] = useState<Intersection | null>(null);
    const [showDensityMap, setShowDensityMap] = useState(true);

    const handleIntersectionClick = (intersection: Intersection) => {
        setSelectedIntersection(intersection);
    };

    return (
        <div className="flex flex-col h-screen p-4 gap-4">
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-3 lg:grid-rows-1 gap-4 flex-grow min-h-0">
                <div className="lg:col-span-3 lg:row-span-1 row-span-2 flex flex-col gap-4">
                   <TrafficGrid 
                        intersections={intersections} 
                        vehicles={vehicles} 
                        onIntersectionClick={handleIntersectionClick}
                        trafficDensity={stats.trafficDensity}
                        showDensityMap={showDensityMap}
                        weather={weather}
                    />
                </div>
                <div className="lg:col-span-1 lg:row-span-1 row-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
                    <ControlPanel 
                        isRunning={isRunning} 
                        onToggleRun={setIsRunning}
                        emergencyActive={stats.emergencyActive}
                        onToggleEmergency={toggleEmergency}
                        simulationSpeed={simulationSpeed}
                        onSetSpeed={setSimulationSpeed}
                        showDensityMap={showDensityMap}
                        onToggleDensityMap={() => setShowDensityMap(prev => !prev)}
                    />
                    {selectedIntersection && (
                        <ManualOverridePanel
                            intersection={selectedIntersection}
                            onOverride={setLightStateManually}
                            onReturnToAuto={returnToAuto}
                            onClose={() => setSelectedIntersection(null)}
                        />
                    )}
                    <AdvancedSettingsPanel
                        currentWeather={weather}
                        onSetWeather={setWeather}
                    />
                    <StatsPanel stats={stats} />
                    <QuantumOptimizerPanel stats={stats} onOptimize={applyQuantumOptimization}/>
                    <LogPanel logs={logs} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
