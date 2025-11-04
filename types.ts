export enum LightState {
  GREEN = 'green',
  YELLOW = 'yellow',
  RED = 'red',
}

export type WeatherCondition = 'Clear' | 'Rain' | 'Fog';

export enum VehicleType {
  CAR = 'car',
  BIKE = 'bike',
  BUS = 'bus',
}

export interface TrafficLight {
  state: LightState;
  timer: number;
}

export interface Intersection {
  id: number;
  // N, S, E, W
  lights: [TrafficLight, TrafficLight, TrafficLight, TrafficLight];
  manualOverride: boolean;
}

export type Direction = 'N' | 'S' | 'E' | 'W';

export interface Vehicle {
  id: number;
  type: VehicleType;
  x: number;
  y: number;
  direction: Direction;
  speed: number;
  stopped: boolean;
  waitTime: number;
  isEmergency: boolean;
}

export interface SimulationStats {
  totalCars: number;
  movingCars: number;
  averageWaitTime: number;
  emergencyActive: boolean;
  historicalWaitTime: { time: number; wait: number }[];
  trafficDensity: { name: string, density: number }[];
  vehicleThroughput: number;
  totalIdleTime: number;
  sensorAccuracy: number;
  vehicleCounts: {
    cars: number;
    bikes: number;
    buses: number;
  };
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'quantum' | 'emergency';
}