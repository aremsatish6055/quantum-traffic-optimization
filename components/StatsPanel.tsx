import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { SimulationStats, VehicleType } from '../types';
import { CarIcon, BikeIcon, BusIcon, EyeIcon } from './icons/Icons';

interface StatsPanelProps {
    stats: SimulationStats;
}

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } }
};

const StatCard: React.FC<{title: string, value: string | number, unit: string}> = ({title, value, unit}) => (
    <div className="bg-white/5 p-3 rounded-md text-center">
        <p className="text-xs text-indigo-300">{title}</p>
        <p className="text-xl font-bold text-white">
            {value} <span className="text-sm font-normal text-gray-400">{unit}</span>
        </p>
    </div>
);

const VehicleCount: React.FC<{icon: React.ReactNode, count: number}> = ({icon, count}) => (
    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-md">
        <div className="text-indigo-300">{icon}</div>
        <div className="text-lg font-bold">{count}</div>
    </div>
);

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
    const accuracyColor = stats.sensorAccuracy > 85 ? 'bg-green-500' : stats.sensorAccuracy > 70 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/10"
        >
            <h2 className="text-lg font-bold text-indigo-300 mb-4">Live Statistics</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
                <StatCard title="Total Vehicles" value={stats.totalCars} unit=" "/>
                <StatCard title="Moving Vehicles" value={stats.movingCars} unit=" "/>
                <StatCard title="Vehicle Throughput" value={stats.vehicleThroughput} unit="veh"/>
                <StatCard title="Total Idle Time" value={Math.round(stats.totalIdleTime / 10)} unit="s"/>
            </div>

            <div className="mb-4">
                 <h3 className="text-sm text-indigo-300 mb-2">Vehicle Distribution</h3>
                 <div className="grid grid-cols-3 gap-2">
                    <VehicleCount icon={<CarIcon />} count={stats.vehicleCounts.cars} />
                    <VehicleCount icon={<BikeIcon />} count={stats.vehicleCounts.bikes} />
                    <VehicleCount icon={<BusIcon />} count={stats.vehicleCounts.buses} />
                 </div>
            </div>

            <div className="mb-4">
                <h3 className="flex items-center gap-2 text-sm text-indigo-300 mb-2">
                    <EyeIcon />
                    Sensor Accuracy
                </h3>
                <div className="w-full bg-white/10 rounded-full h-4 relative">
                    <motion.div
                        className={`h-4 rounded-full ${accuracyColor}`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${stats.sensorAccuracy}%` }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                    <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
                        {stats.sensorAccuracy}%
                    </span>
                </div>
            </div>

            <div className="bg-white/5 p-3 rounded-md mb-4">
                <p className="text-xs text-indigo-300 text-center">Average Wait Time</p>
                <p className="text-2xl font-bold text-white text-center">
                    {stats.averageWaitTime.toFixed(2)} <span className="text-base font-normal text-gray-400">s</span>
                </p>
            </div>

            <div className="h-40 w-full mb-4">
                <h3 className="text-sm text-indigo-300 mb-2">Wait Time History (s)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.historicalWaitTime} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="time" tick={{ fill: '#a5b4fc' }} fontSize={10} />
                        <YAxis tick={{ fill: '#a5b4fc' }} fontSize={10} />
                        <Tooltip contentStyle={{backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid #4f46e5'}}/>
                        <Line type="monotone" dataKey="wait" stroke="#818cf8" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="h-40 w-full">
                 <h3 className="text-sm text-indigo-300 mb-2">Traffic Density (%)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.trafficDensity} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                         <XAxis dataKey="name" tick={{ fill: '#a5b4fc' }} fontSize={10} />
                         <YAxis tick={{ fill: '#a5b4fc' }} fontSize={10} />
                         <Tooltip contentStyle={{backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid #4f46e5'}}/>
                         <Bar dataKey="density" fill="rgba(99, 102, 241, 0.6)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </motion.div>
    );
};

export default StatsPanel;