import React from 'react';
import { motion } from 'framer-motion';
import { Intersection } from '../types';
import { XIcon, ArrowUp, ArrowRight } from './icons/Icons';

interface ManualOverridePanelProps {
    intersection: Intersection;
    onOverride: (intersectionId: number, direction: 'NS' | 'EW') => void;
    onReturnToAuto: (intersectionId: number) => void;
    onClose: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }
};

const ManualOverridePanel: React.FC<ManualOverridePanelProps> = ({ intersection, onOverride, onReturnToAuto, onClose }) => {
    return (
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-blue-500/50 relative"
        >
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                <XIcon />
            </button>
            <h2 className="text-lg font-bold text-blue-300 mb-3">Intersection {intersection.id + 1} Control</h2>
            
            <div className="flex flex-col gap-2">
                <p className="text-xs text-center text-gray-400 mb-1">Force Green Light</p>
                <div className="grid grid-cols-2 gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onOverride(intersection.id, 'NS')}
                        className="flex items-center justify-center gap-2 w-full px-3 py-1.5 font-semibold rounded-lg bg-indigo-600/50 hover:bg-indigo-600/80 text-white"
                    >
                        <ArrowUp /><ArrowUp style={{transform: 'rotate(180deg)'}}/> N/S
                    </motion.button>
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onOverride(intersection.id, 'EW')}
                        className="flex items-center justify-center gap-2 w-full px-3 py-1.5 font-semibold rounded-lg bg-indigo-600/50 hover:bg-indigo-600/80 text-white"
                    >
                        <ArrowRight style={{transform: 'rotate(180deg)'}}/><ArrowRight/> E/W
                    </motion.button>
                </div>
                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onReturnToAuto(intersection.id)}
                    className="w-full mt-2 px-3 py-1.5 font-semibold rounded-lg bg-gray-500/50 hover:bg-gray-500/80 text-white"
                >
                    Return to Automatic
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ManualOverridePanel;
