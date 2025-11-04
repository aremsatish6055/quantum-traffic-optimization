import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationStats } from '../types';
import { getQuantumOptimizationExplanation } from '../services/geminiService';
import { BrainCircuitIcon } from './icons/Icons';

interface QuantumOptimizerPanelProps {
    stats: SimulationStats;
    onOptimize: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.6 } }
};

const QuantumOptimizerPanel: React.FC<QuantumOptimizerPanelProps> = ({ stats, onOptimize }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [explanation, setExplanation] = useState('');

    const handleOptimizeClick = async () => {
        setIsLoading(true);
        setExplanation('');
        onOptimize(); // Log the optimization attempt immediately
        try {
            const result = await getQuantumOptimizationExplanation(stats);
            setExplanation(result);
            // In a real scenario, you'd parse `result` to get new timings.
        } catch (error) {
            setExplanation('An error occurred during optimization.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/10"
        >
            <h2 className="text-lg font-bold text-indigo-300 mb-4">Quantum Optimizer</h2>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOptimizeClick}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 font-semibold rounded-lg transition-all bg-indigo-600/80 hover:bg-indigo-600 text-white disabled:bg-gray-500"
            >
                <BrainCircuitIcon />
                <span>{isLoading ? 'Calculating...' : 'Optimize Signal Timing'}</span>
            </motion.button>
            <div className="mt-4 text-sm text-gray-300 space-y-2 prose prose-invert prose-sm max-w-none">
                {isLoading && (
                    <div className="flex items-center justify-center p-4">
                        <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-indigo-400"></div>
                        <p className="ml-3">Engaging quantum processor...</p>
                    </div>
                )}
                {explanation && explanation.split('\n').map((line, index) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                        return <h3 key={index} className="text-indigo-300 font-bold !mt-4 !mb-1">{line.replace(/\*\*/g, '')}</h3>;
                    }
                     if (line.startsWith('*   ')) {
                        return <p key={index} className="!my-1 ml-4">{line}</p>;
                    }
                    return <p key={index} className="!my-1">{line}</p>;
                })}
            </div>
        </motion.div>
    );
};

export default QuantumOptimizerPanel;
