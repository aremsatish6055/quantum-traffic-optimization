import React from 'react';
import { motion, Variants } from 'framer-motion';

interface BuildingComponentProps {
    x: number;
    y: number;
    size: number;
    delay: number;
}

// Fix: Explicitly type `buildingVariants` with `Variants` to provide contextual typing for the `ease` property.
const buildingVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

const BuildingComponent: React.FC<BuildingComponentProps> = ({ x, y, size, delay }) => {
    return (
        <motion.div
            custom={delay}
            variants={buildingVariants}
            className="absolute bg-gray-800/70 border-t-2 border-l-2 border-gray-700/50 border-b-2 border-r-2 border-black/30 rounded-sm"
            style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

export default BuildingComponent;
