import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, AmbulanceIcon, SpeedIcon, HeatmapIcon } from './icons/Icons';

interface ControlPanelProps {
    isRunning: boolean;
    onToggleRun: () => void;
    emergencyActive: boolean;
    onToggleEmergency: () => void;
    simulationSpeed: number;
    onSetSpeed: (speed: number) => void;
    showDensityMap: boolean;
    onToggleDensityMap: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
};

const ControlPanel: React.FC<ControlPanelProps> = ({ 
    isRunning, onToggleRun, 
    emergencyActive, onToggleEmergency, 
    simulationSpeed, onSetSpeed,
    showDensityMap, onToggleDensityMap 
}) => {
    const speeds = [1, 2, 5];

    return (
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/10"
        >
            <h2 className="text-lg font-bold text-indigo-300 mb-4">System Controls</h2>
            <div className="flex flex-col gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggleRun}
                    className={`flex items-center justify-center gap-2 w-full px-4 py-2 font-semibold rounded-lg transition-all
                        ${isRunning ? 'bg-yellow-500/80 hover:bg-yellow-500 text-black' : 'bg-green-500/80 hover:bg-green-500 text-white'}`}
                >
                    {isRunning ? <PauseIcon /> : <PlayIcon />}
                    <span>{isRunning ? 'Pause Simulation' : 'Start Simulation'}</span>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggleEmergency}
                    className={`flex items-center justify-center gap-2 w-full px-4 py-2 font-semibold rounded-lg transition-all
                        ${emergencyActive ? 'bg-red-500/80 hover:bg-red-500 text-white animate-pulse' : 'bg-blue-500/80 hover:bg-blue-500 text-white'}`}
                >
                    <AmbulanceIcon />
                    <span>{emergencyActive ? 'Disable Emergency' : 'Emergency Priority'}</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggleDensityMap}
                    className={`flex items-center justify-center gap-2 w-full px-4 py-2 font-semibold rounded-lg transition-all
                        ${showDensityMap ? 'bg-purple-500/80 hover:bg-purple-500 text-white' : 'bg-gray-600/80 hover:bg-gray-600 text-white'}`}
                >
                    <HeatmapIcon />
                    <span>{showDensityMap ? 'Hide Density Map' : 'Show Density Map'}</span>
                </motion.button>

                <div className="pt-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300 mb-2">
                        <SpeedIcon />
                        Simulation Speed
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {speeds.map(speed => (
                             <motion.button
                                key={speed}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSetSpeed(speed)}
                                className={`px-4 py-1.5 font-semibold rounded-lg transition-colors ${
                                    simulationSpeed === speed 
                                    ? 'bg-indigo-500 text-white' 
                                    : 'bg-white/10 hover:bg-white/20 text-indigo-200'
                                }`}
                            >
                                {speed}x
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ControlPanel;