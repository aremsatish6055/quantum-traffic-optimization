import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherCondition } from '../types';

interface WeatherOverlayProps {
    weather: WeatherCondition;
}

const Raindrop: React.FC<{ delay: number, left: number }> = ({ delay, left }) => (
    <motion.div
        className="absolute w-0.5 h-6 bg-gradient-to-b from-transparent to-blue-300/50"
        style={{ left: `${left}%` }}
        initial={{ y: -50, opacity: 0 }}
        animate={{
            y: '100vh',
            opacity: [0, 1, 1, 0],
            transition: {
                duration: 0.5 + Math.random() * 0.5,
                delay,
                repeat: Infinity,
                ease: "linear"
            }
        }}
    />
);

const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ weather }) => {
    return (
        <AnimatePresence>
            {weather === 'Rain' && (
                <motion.div
                    key="rain"
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {Array.from({ length: 70 }).map((_, i) => (
                        <Raindrop key={i} delay={Math.random() * 2} left={Math.random() * 100} />
                    ))}
                </motion.div>
            )}
            {weather === 'Fog' && (
                <motion.div
                    key="fog"
                    className="absolute inset-0 pointer-events-none bg-gray-500/40 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </AnimatePresence>
    );
};

export default WeatherOverlay;
