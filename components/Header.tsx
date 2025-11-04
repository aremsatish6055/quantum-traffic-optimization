
import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    return (
        <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/10 flex items-center justify-between"
        >
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider" style={{textShadow: '0 0 8px rgba(139, 92, 246, 0.8)'}}>
                    Quantum Traffic Flow Optimization
                </h1>
                <p className="text-xs md:text-sm text-indigo-300">A next-gen traffic management system powered by quantum algorithms</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 text-sm font-mono">LIVE</span>
            </div>
        </motion.div>
    );
};

export default Header;
