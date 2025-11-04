
import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from '../types';
import { BrainCircuitIcon, AmbulanceIcon, PlayIcon, PauseIcon, LogIcon } from './icons/Icons';

interface LogPanelProps {
    logs: LogEntry[];
}

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.8 } }
};

// Fix: Changed JSX.Element to React.ReactElement to resolve the "Cannot find namespace 'JSX'" error.
const LogIconMap: Record<LogEntry['type'], React.ReactElement> = {
    info: <PlayIcon />,
    warning: <LogIcon />,
    quantum: <BrainCircuitIcon />,
    emergency: <AmbulanceIcon />,
};

const LogColorMap: Record<LogEntry['type'], string> = {
    info: 'text-green-400',
    warning: 'text-yellow-400',
    quantum: 'text-indigo-400',
    emergency: 'text-red-400',
};


const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
    return (
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/10"
        >
            <h2 className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <LogIcon />
                System Event Log
            </h2>
            <div className="h-48 overflow-y-auto space-y-2 pr-2">
                {logs.length === 0 && <p className="text-sm text-gray-500 text-center mt-4">No events yet...</p>}
                {logs.map((log, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3 text-xs"
                    >
                        <div className={`flex-shrink-0 ${LogColorMap[log.type]}`}>
                            {LogIconMap[log.type]}
                        </div>
                        <div className="flex-grow">
                            <span className="font-mono text-gray-500 mr-2">{log.timestamp}</span>
                            <span className="text-gray-300">{log.message}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default LogPanel;
