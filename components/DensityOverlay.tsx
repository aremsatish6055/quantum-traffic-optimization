import React from 'react';
import { motion } from 'framer-motion';

interface DensityOverlayProps {
    trafficDensity: { name: string; density: number }[];
}

const GRID_SIZE = 3;
const LANE_WIDTH = 50;
const INTERSECTION_SIZE = 100;
const CELL_SIZE = LANE_WIDTH * 2 + INTERSECTION_SIZE;

const DensityOverlay: React.FC<DensityOverlayProps> = ({ trafficDensity }) => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {trafficDensity.map((item, index) => {
                const density = item.density / 100; // Normalize to 0-1
                if (density < 0.05) return null; // Don't render for very low density

                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                
                const centerX = x * CELL_SIZE + INTERSECTION_SIZE / 2;
                const centerY = y * CELL_SIZE + INTERSECTION_SIZE / 2;

                // Color: from cool blue (low density) to hot red (high density)
                const hue = 240 - density * 240; // 240 (blue) -> 0 (red)
                const saturation = 70 + density * 30; // 70% -> 100%
                const lightness = 50;
                const opacity = 0.1 + density * 0.5; // 0.1 -> 0.6

                const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
                
                const scale = 0.8 + density * 1.2; // 0.8 -> 2.0

                return (
                    <motion.div
                        key={`density-${index}`}
                        className="absolute rounded-full"
                        style={{
                            left: centerX,
                            top: centerY,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            x: '-50%',
                            y: '-50%',
                            background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: scale, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                );
            })}
        </div>
    );
};

export default DensityOverlay;