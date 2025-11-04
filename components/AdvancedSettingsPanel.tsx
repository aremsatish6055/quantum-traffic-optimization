import React from 'react';
import { motion } from 'framer-motion';
import { WeatherCondition } from '../types';
import { SettingsIcon, SunIcon, RainIcon, FogIcon } from './icons/Icons';

interface AdvancedSettingsPanelProps {
    currentWeather: WeatherCondition;
    onSetWeather: (weather: WeatherCondition) => void;
}

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.5 } }
};

const WeatherButton: React.FC<{
    label: WeatherCondition;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-1 w-full p-2 font-semibold rounded-lg transition-colors text-xs
                ${isActive
                ? 'bg-indigo-500 text-white'
                : 'bg-white/10 hover:bg-white/20 text-indigo-200'
            }`}
        >
            {icon}
            <span>{label}</span>
        </motion.button>
    );
};

const AdvancedSettingsPanel: React.FC<AdvancedSettingsPanelProps> = ({ currentWeather, onSetWeather }) => {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/10"
        >
            <h2 className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <SettingsIcon />
                Advanced Settings
            </h2>
            
            <div>
                <label className="text-sm font-semibold text-indigo-300 mb-2 block">
                    Weather Conditions
                </label>
                <div className="grid grid-cols-3 gap-2">
                    <WeatherButton
                        label="Clear"
                        icon={<SunIcon />}
                        isActive={currentWeather === 'Clear'}
                        onClick={() => onSetWeather('Clear')}
                    />
                    <WeatherButton
                        label="Rain"
                        icon={<RainIcon />}
                        isActive={currentWeather === 'Rain'}
                        onClick={() => onSetWeather('Rain')}
                    />
                    <WeatherButton
                        label="Fog"
                        icon={<FogIcon />}
                        isActive={currentWeather === 'Fog'}
                        onClick={() => onSetWeather('Fog')}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default AdvancedSettingsPanel;
