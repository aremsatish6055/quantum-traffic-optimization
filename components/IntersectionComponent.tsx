
import React from 'react';
import { motion, TargetAndTransition } from 'framer-motion';
import { Intersection, LightState } from '../types';

interface IntersectionComponentProps {
    intersection: Intersection;
    x: number;
    y: number;
    onClick: () => void;
}

const INTERSECTION_SIZE = 100;

// Fix: Explicitly type `lightPulse` with `TargetAndTransition` to provide contextual typing for the `ease` property.
const lightPulse: TargetAndTransition = {
  scale: [1, 1.2, 1],
  transition: { duration: 0.3, ease: 'easeInOut' },
};

const LightCircle: React.FC<{ color: string; active: boolean; state: LightState }> = ({ color, active, state }) => {
    const activeColor = {
        red: 'bg-red-500 shadow-[0_0_8px_2px_#ef4444]',
        yellow: 'bg-yellow-500 shadow-[0_0_8px_2px_#eab308]',
        green: 'bg-green-500 shadow-[0_0_8px_2px_#22c55e]',
    }[color];

    return (
        <motion.div
            key={`${color}-${active}`}
            className={`w-3 h-3 rounded-full ${active ? activeColor : 'bg-gray-600/50'}`}
            animate={active ? lightPulse : {}}
        />
    );
};


const TrafficSignal: React.FC<{ state: LightState; rotation: number }> = ({ state, rotation }) => {
    return (
        <div 
            className="absolute flex flex-col items-center justify-around w-5 h-12 bg-black/80 rounded-md p-1 border border-gray-600"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <LightCircle color="red" active={state === LightState.RED} state={state} />
            <LightCircle color="yellow" active={state === LightState.YELLOW} state={state} />
            <LightCircle color="green" active={state === LightState.GREEN} state={state} />
        </div>
    );
};

const LaneMarking: React.FC<{ x: number, y: number, isVertical: boolean }> = ({ x, y, isVertical }) => (
    <div 
        className="absolute bg-white/30"
        style={{
            left: `${x}px`,
            top: `${y}px`,
            width: isVertical ? '2px' : '10px',
            height: isVertical ? '10px' : '2px',
        }}
    />
);

const IntersectionComponent: React.FC<IntersectionComponentProps> = ({ intersection, x, y, onClick }) => {
    const manualOverrideClass = intersection.manualOverride
        ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-800 animate-pulse'
        : '';

    return (
        <div
            className={`absolute bg-gray-800 cursor-pointer rounded-md hover:ring-2 hover:ring-indigo-400 transition-all overflow-hidden ${manualOverrideClass}`}
            style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${INTERSECTION_SIZE}px`,
                height: `${INTERSECTION_SIZE}px`,
            }}
            onClick={onClick}
        >
            {/* Lane Markings */}
            <div className="absolute inset-0">
                {/* Vertical */}
                {[20, 60].map(offset => (
                    <React.Fragment key={`v-${offset}`}>
                        <LaneMarking x={INTERSECTION_SIZE/2 - 5} y={offset} isVertical={true} />
                        <LaneMarking x={INTERSECTION_SIZE/2 + 5} y={offset} isVertical={true} />
                    </React.Fragment>
                ))}
                 {/* Horizontal */}
                {[20, 60].map(offset => (
                     <React.Fragment key={`h-${offset}`}>
                        <LaneMarking x={offset} y={INTERSECTION_SIZE/2 - 5} isVertical={false} />
                        <LaneMarking x={offset} y={INTERSECTION_SIZE/2 + 5} isVertical={false} />
                    </React.Fragment>
                ))}
            </div>

            {/* Traffic Signals positioned at corners */}
            <div className="absolute w-full h-full">
                {/* For traffic FROM North (bottom right corner of intersection, facing up) */}
                <div className="absolute" style={{ right: `8px`, bottom: `8px` }}>
                    <TrafficSignal state={intersection.lights[0].state} rotation={0} />
                </div>
                {/* For traffic FROM South (top left corner, facing down) */}
                <div className="absolute" style={{ left: `8px`, top: `8px` }}>
                    <TrafficSignal state={intersection.lights[1].state} rotation={180} />
                </div>
                 {/* For traffic FROM East (bottom left, facing right) */}
                <div className="absolute" style={{ left: `8px`, bottom: `8px` }}>
                    <TrafficSignal state={intersection.lights[2].state} rotation={270} />
                </div>
                {/* For traffic FROM West (top right, facing left) */}
                <div className="absolute" style={{ right: `8px`, top: `8px` }}>
                    <TrafficSignal state={intersection.lights[3].state} rotation={90} />
                </div>
            </div>
        </div>
    );
};

export default IntersectionComponent;