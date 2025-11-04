
import React from 'react';
import { Vehicle, VehicleType } from '../types';

interface VehicleComponentProps {
    vehicle: Vehicle;
}

const VehicleComponent: React.FC<VehicleComponentProps> = ({ vehicle }) => {
    const rotation = {
        'N': -90,
        'S': 90,
        'E': 0,
        'W': 180
    }[vehicle.direction];
    
    let vehicleStyle = '';
    
    switch (vehicle.type) {
        case VehicleType.CAR:
            vehicleStyle = 'w-6 h-3 rounded-sm bg-indigo-500 border-indigo-300';
            break;
        case VehicleType.BIKE:
            vehicleStyle = 'w-2 h-2 rounded-full bg-green-400 border-green-200';
            break;
        case VehicleType.BUS:
            vehicleStyle = 'w-10 h-4 rounded bg-yellow-500 border-yellow-300';
            break;
    }

    if (vehicle.isEmergency) {
        vehicleStyle += ' border-red-500 animate-pulse';
    }

    const shadow = vehicle.isEmergency ? '0 0 10px #3b82f6' : {
        [VehicleType.CAR]: '0 0 5px #6366f1',
        [VehicleType.BIKE]: '0 0 5px #4ade80',
        [VehicleType.BUS]: '0 0 5px #eab308',
    }[vehicle.type];

    return (
        <div 
            className={`absolute border ${vehicleStyle} transition-all duration-100 ease-linear`}
            style={{ 
                left: `${vehicle.x}px`, 
                top: `${vehicle.y}px`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                boxShadow: shadow
             }}
        />
    );
};

export default VehicleComponent;
