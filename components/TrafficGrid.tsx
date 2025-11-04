import React from 'react';
import { motion } from 'framer-motion';
import { Intersection, Vehicle, WeatherCondition } from '../types';
import IntersectionComponent from './IntersectionComponent';
import VehicleComponent from './CarComponent';
import DensityOverlay from './DensityOverlay';
import BuildingComponent from './BuildingComponent';
import WeatherOverlay from './WeatherOverlay';

interface TrafficGridProps {
  intersections: Intersection[];
  vehicles: Vehicle[];
  onIntersectionClick: (intersection: Intersection) => void;
  trafficDensity: { name: string; density: number }[];
  showDensityMap: boolean;
  weather: WeatherCondition;
}

const GRID_SIZE = 3;
const LANE_WIDTH = 50;
const INTERSECTION_SIZE = 100;
const CELL_SIZE = LANE_WIDTH * 2 + INTERSECTION_SIZE;

const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const StreetLabel: React.FC<{ text: string; position: 'top' | 'left'; index: number }> = ({ text, position, index }) => {
    const style: React.CSSProperties = {
        position: 'absolute',
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        userSelect: 'none',
    };
    if (position === 'top') {
        style.left = `${index * CELL_SIZE + INTERSECTION_SIZE / 2}px`;
        style.top = `-20px`;
        style.width = `${LANE_WIDTH * 2}px`;
        style.textAlign = 'center';
    } else {
        style.top = `${index * CELL_SIZE + INTERSECTION_SIZE / 2}px`;
        style.left = `-45px`;
        style.width = `${LANE_WIDTH * 2}px`;
        style.textAlign = 'center';
        style.transform = 'translateY(-50%) rotate(-90deg)';
    }
    return <div style={style}>{text}</div>;
};


const TrafficGrid: React.FC<TrafficGridProps> = ({ intersections, vehicles, onIntersectionClick, trafficDensity, showDensityMap, weather }) => {
    const buildingSize = LANE_WIDTH * 2;

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-black/30 backdrop-blur-sm p-4 pl-12 pt-8 rounded-xl shadow-lg border border-white/10 flex-grow w-full h-full overflow-hidden"
        >
            <div className="absolute inset-0 bg-grid-gray-700/20 [background-size:20px_20px]"></div>
            <div className="relative w-full h-full" style={{minWidth: `${GRID_SIZE * CELL_SIZE}px`, minHeight: `${GRID_SIZE * CELL_SIZE}px`}}>
                {/* Street Labels */}
                {Array.from({ length: GRID_SIZE }).map((_, i) => (
                    <React.Fragment key={`label-${i}`}>
                        <StreetLabel text={`${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : 'rd'} Ave`} position="top" index={i} />
                        <StreetLabel text={`${String.fromCharCode(65 + i)} St`} position="left" index={i} />
                    </React.Fragment>
                ))}

                {/* Buildings */}
                {Array.from({ length: GRID_SIZE -1 }).map((_, row) =>
                    Array.from({ length: GRID_SIZE - 1 }).map((_, col) => (
                        <BuildingComponent
                            key={`building-${row}-${col}`}
                            x={col * CELL_SIZE + INTERSECTION_SIZE}
                            y={row * CELL_SIZE + INTERSECTION_SIZE}
                            size={buildingSize}
                            delay={0.5 + (row * (GRID_SIZE-1) + col) * 0.05}
                        />
                    ))
                )}


                {/* Roads */}
                {Array.from({ length: GRID_SIZE }).map((_, i) => (
                    <React.Fragment key={`road-${i}`}>
                        {/* Vertical Road */}
                        <div 
                            className="absolute bg-gray-700"
                            style={{ 
                                left: `${i * CELL_SIZE + INTERSECTION_SIZE/2}px`, 
                                top: 0, 
                                width: `${LANE_WIDTH * 2}px`, 
                                height: '100%' 
                            }}
                        />
                         {/* Horizontal Road */}
                        <div 
                            className="absolute bg-gray-700"
                            style={{ 
                                top: `${i * CELL_SIZE + INTERSECTION_SIZE/2}px`, 
                                left: 0, 
                                height: `${LANE_WIDTH * 2}px`, 
                                width: '100%' 
                            }}
                        />
                    </React.Fragment>
                ))}

                {showDensityMap && <DensityOverlay trafficDensity={trafficDensity} />}

                {intersections.map((intersection, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    return (
                        <IntersectionComponent 
                            key={intersection.id} 
                            intersection={intersection}
                            x={x * CELL_SIZE}
                            y={y * CELL_SIZE}
                            onClick={() => onIntersectionClick(intersection)}
                        />
                    );
                })}

                {vehicles.map(vehicle => (
                    <VehicleComponent key={vehicle.id} vehicle={vehicle} />
                ))}

                <WeatherOverlay weather={weather} />
            </div>
        </motion.div>
    );
};

export default TrafficGrid;