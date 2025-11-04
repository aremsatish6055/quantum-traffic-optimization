import { useState, useEffect, useRef, useCallback } from 'react';
import { Vehicle, Intersection, LightState, SimulationStats, Direction, LogEntry, WeatherCondition, VehicleType } from '../types';

const GRID_SIZE = 3;
const LANE_WIDTH = 50; // pixels
const INTERSECTION_SIZE = 100; // pixels
const CELL_SIZE = LANE_WIDTH * 2 + INTERSECTION_SIZE;

const INITIAL_LIGHT_DURATION = 20; // in simulation ticks
const YELLOW_LIGHT_DURATION = 5;

const useTrafficSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [weather, setWeather] = useState<WeatherCondition>('Clear');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [intersections, setIntersections] = useState<Intersection[]>(() =>
    Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
      id: i,
      lights: [
        { state: i % 2 === 0 ? LightState.GREEN : LightState.RED, timer: INITIAL_LIGHT_DURATION },
        { state: i % 2 === 0 ? LightState.GREEN : LightState.RED, timer: INITIAL_LIGHT_DURATION },
        { state: i % 2 === 0 ? LightState.RED : LightState.GREEN, timer: INITIAL_LIGHT_DURATION },
        { state: i % 2 === 0 ? LightState.RED : LightState.GREEN, timer: INITIAL_LIGHT_DURATION },
      ],
      manualOverride: false,
    }))
  );
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [stats, setStats] = useState<SimulationStats>({
    totalCars: 0,
    movingCars: 0,
    averageWaitTime: 0,
    emergencyActive: false,
    historicalWaitTime: [],
    trafficDensity: [],
    vehicleThroughput: 0,
    totalIdleTime: 0,
    sensorAccuracy: 100,
    vehicleCounts: { cars: 0, bikes: 0, buses: 0 },
  });

  const simulationTick = useRef(0);
  const vehicleIdCounter = useRef(0);
  const vehicleThroughput = useRef(0);

  const addLog = useCallback((message: string, type: LogEntry['type']) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [{ timestamp, message, type }, ...prev].slice(0, 100));
  }, []);

  const handleSetWeather = useCallback((newWeather: WeatherCondition) => {
    setWeather(newWeather);
    addLog(`Weather changed to ${newWeather}.`, 'info');
  }, [addLog]);

  const updateLights = useCallback(() => {
    setIntersections(prev =>
      prev.map(intersection => {
        if (intersection.manualOverride) {
            return intersection;
        }

        const newLights = [...intersection.lights];
        let needsSwitch = false;
        
        newLights[0].timer--;
        if (newLights[0].timer <= 0) needsSwitch = true;
        
        for(let i=1; i<4; i++) {
          newLights[i].timer = newLights[0].timer;
        }

        if (needsSwitch) {
            const isNSGreen = newLights[0].state === LightState.GREEN;
            if (isNSGreen) {
                newLights[0].state = newLights[1].state = LightState.YELLOW;
                newLights[0].timer = newLights[1].timer = YELLOW_LIGHT_DURATION;
            } else {
                 newLights[2].state = newLights[3].state = LightState.YELLOW;
                 newLights[2].timer = newLights[3].timer = YELLOW_LIGHT_DURATION;
            }
        } else if (newLights[0].timer === INITIAL_LIGHT_DURATION - YELLOW_LIGHT_DURATION && newLights[0].state === LightState.YELLOW) {
            const wasNSGreen = newLights[2].state === LightState.RED; // Before yellow, one pair was green
            if(wasNSGreen){
                newLights[0].state = newLights[1].state = LightState.RED;
                newLights[2].state = newLights[3].state = LightState.GREEN;
            } else {
                newLights[0].state = newLights[1].state = LightState.GREEN;
                newLights[2].state = newLights[3].state = LightState.RED;
            }
            newLights.forEach(l => l.timer = INITIAL_LIGHT_DURATION);
        }

        return { ...intersection, lights: newLights as [any, any, any, any] };
      })
    );
  }, []);

  const spawnVehicle = useCallback(() => {
    if (vehicles.length > 50) return;
    const edge = Math.floor(Math.random() * 4);
    const position = Math.floor(Math.random() * GRID_SIZE);
    
    let x = 0, y = 0, direction: Direction = 'E';

    switch (edge) {
      case 0: // Top
        y = -20; x = position * CELL_SIZE + INTERSECTION_SIZE / 2 + LANE_WIDTH / 2; direction = 'S';
        break;
      case 1: // Bottom
        y = GRID_SIZE * CELL_SIZE + 20; x = position * CELL_SIZE + INTERSECTION_SIZE / 2 - LANE_WIDTH / 2; direction = 'N';
        break;
      case 2: // Left
        x = -20; y = position * CELL_SIZE + INTERSECTION_SIZE / 2 - LANE_WIDTH / 2; direction = 'E';
        break;
      case 3: // Right
        x = GRID_SIZE * CELL_SIZE + 20; y = position * CELL_SIZE + INTERSECTION_SIZE / 2 + LANE_WIDTH / 2; direction = 'W';
        break;
    }

    const rand = Math.random();
    let type: VehicleType;
    let speed: number;

    if (rand < 0.7) {
        type = VehicleType.CAR;
        speed = 2 + Math.random() * 2; // 2-4
    } else if (rand < 0.9) {
        type = VehicleType.BIKE;
        speed = 3 + Math.random() * 2; // 3-5
    } else {
        type = VehicleType.BUS;
        speed = 1.5 + Math.random() * 1; // 1.5-2.5
    }
    
    const newVehicle: Vehicle = {
      id: vehicleIdCounter.current++,
      type, x, y, direction, speed,
      stopped: false,
      waitTime: 0,
      isEmergency: false,
    };
    setVehicles(prev => [...prev, newVehicle]);
  }, [vehicles.length]);

  const moveVehicles = useCallback((currentWeather: WeatherCondition) => {
    setVehicles(prevVehicles => {
      const getWeatherMultiplier = (vehicleType: VehicleType) => {
        switch (currentWeather) {
          case 'Rain':
            return vehicleType === VehicleType.BIKE ? 0.5 : 0.7;
          case 'Fog':
            return vehicleType === VehicleType.BIKE ? 0.3 : 0.4;
          case 'Clear':
          default:
            return 1.0;
        }
      };

      const newVehicles = prevVehicles.map(vehicle => {
        const gridX = Math.floor(vehicle.x / CELL_SIZE);
        const gridY = Math.floor(vehicle.y / CELL_SIZE);
        
        const isNearIntersection = (pos: number, dir: 'x' | 'y') => {
            const posInCell = pos % CELL_SIZE;
            if (dir === 'x') {
                return (vehicle.direction === 'E' && posInCell > CELL_SIZE - INTERSECTION_SIZE - LANE_WIDTH-10 && posInCell < CELL_SIZE - INTERSECTION_SIZE - LANE_WIDTH) ||
                       (vehicle.direction === 'W' && posInCell < INTERSECTION_SIZE + LANE_WIDTH && posInCell > INTERSECTION_SIZE + LANE_WIDTH-10);
            } else { // dir 'y'
                 return (vehicle.direction === 'S' && posInCell > CELL_SIZE - INTERSECTION_SIZE - LANE_WIDTH-10 && posInCell < CELL_SIZE - INTERSECTION_SIZE - LANE_WIDTH) ||
                       (vehicle.direction === 'N' && posInCell < INTERSECTION_SIZE + LANE_WIDTH && posInCell > INTERSECTION_SIZE + LANE_WIDTH-10);
            }
        };

        let stop = false;
        
        if (gridX >= 0 && gridX < GRID_SIZE && gridY >= 0 && gridY < GRID_SIZE) {
            if (isNearIntersection(vehicle.x, 'x') || isNearIntersection(vehicle.y, 'y')) {
                const intersection = intersections[gridY * GRID_SIZE + gridX];
                if(intersection){
                    const lightIndex = {'N': 0, 'S': 1, 'E': 2, 'W': 3}[vehicle.direction];
                    const light = intersection.lights[lightIndex];
                    if (light.state === LightState.RED || light.state === LightState.YELLOW) {
                        stop = true;
                    }
                }
            }
        }
        
        if (!stop) {
            for (const otherVehicle of prevVehicles) {
                if (vehicle.id === otherVehicle.id) continue;
                const dist = Math.hypot(vehicle.x - otherVehicle.x, vehicle.y - otherVehicle.y);
                const safetyDistance = vehicle.type === VehicleType.BUS ? 30 : 20;
                if (dist < safetyDistance) {
                     if (vehicle.direction === 'N' && vehicle.y > otherVehicle.y) stop = true;
                     else if (vehicle.direction === 'S' && vehicle.y < otherVehicle.y) stop = true;
                     else if (vehicle.direction === 'E' && vehicle.x < otherVehicle.x) stop = true;
                     else if (vehicle.direction === 'W' && vehicle.x > otherVehicle.x) stop = true;
                     if(stop) break;
                }
            }
        }

        const newVehicle = { ...vehicle };
        newVehicle.stopped = stop && !vehicle.isEmergency;
        if(newVehicle.stopped) {
            newVehicle.waitTime += 1;
        } else {
            const weatherMultiplier = getWeatherMultiplier(newVehicle.type);
            const effectiveSpeed = newVehicle.speed * weatherMultiplier;
            switch (newVehicle.direction) {
                case 'N': newVehicle.y -= effectiveSpeed; break;
                case 'S': newVehicle.y += effectiveSpeed; break;
                case 'E': newVehicle.x += effectiveSpeed; break;
                case 'W': newVehicle.x -= effectiveSpeed; break;
            }
        }
        return newVehicle;
      });

      const survivingVehicles = newVehicles.filter(vehicle => vehicle.x > -50 && vehicle.x < GRID_SIZE * CELL_SIZE + 50 && vehicle.y > -50 && vehicle.y < GRID_SIZE * CELL_SIZE + 50);
      const exitedVehicleCount = newVehicles.length - survivingVehicles.length;
      if (exitedVehicleCount > 0) {
        vehicleThroughput.current += exitedVehicleCount;
      }
      return survivingVehicles;
    });
  }, [intersections]);

  const updateStats = useCallback(() => {
      simulationTick.current++;
      const totalCars = vehicles.length;
      const movingCars = vehicles.filter(c => !c.stopped).length;
      const totalWaitTime = vehicles.reduce((acc, car) => acc + car.waitTime, 0);
      const totalIdleTime = vehicles.filter(c => c.stopped).reduce((acc, car) => acc + car.waitTime, 0);
      const averageWaitTime = totalCars > 0 ? totalWaitTime / totalCars / 10 : 0; // rough seconds
      
      const vehicleCounts = {
        cars: vehicles.filter(v => v.type === VehicleType.CAR).length,
        bikes: vehicles.filter(v => v.type === VehicleType.BIKE).length,
        buses: vehicles.filter(v => v.type === VehicleType.BUS).length,
      };

      if(simulationTick.current % 10 === 0) {
        setStats(prev => ({
          ...prev,
          historicalWaitTime: [...prev.historicalWaitTime, {time: simulationTick.current, wait: averageWaitTime}].slice(-50)
        }));
      }

      let sensorAccuracy = 100;
      let noiseFactor = 0;
      if (weather === 'Rain') {
          sensorAccuracy = 90;
          noiseFactor = 0.1;
      } else if (weather === 'Fog') {
          sensorAccuracy = 75;
          noiseFactor = 0.25;
      }

      const trafficDensity = Array.from({length: GRID_SIZE * GRID_SIZE}, (_, i) => {
        const intersectionX = (i % GRID_SIZE) * CELL_SIZE;
        const intersectionY = Math.floor(i / GRID_SIZE) * CELL_SIZE;
        let carsNear = vehicles.filter(c => Math.hypot(c.x - intersectionX, c.y - intersectionY) < CELL_SIZE).length;
        
        // Apply sensor noise
        if (noiseFactor > 0) {
            const noise = (Math.random() - 0.5) * 2 * noiseFactor * carsNear;
            carsNear = Math.max(0, Math.round(carsNear + noise));
        }

        return { name: `Int ${i+1}`, density: (carsNear / Math.max(1, vehicles.length)) * 100 };
      });

      setStats(prev => ({...prev, totalCars, movingCars, averageWaitTime, trafficDensity, vehicleThroughput: vehicleThroughput.current, totalIdleTime, vehicleCounts, sensorAccuracy}));
  }, [vehicles, weather]);


  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      updateLights();
      moveVehicles(weather);
      if (simulationTick.current % 50 === 0) {
        spawnVehicle();
      }
      updateStats();
    }, 100 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isRunning, simulationSpeed, weather, updateLights, moveVehicles, spawnVehicle, updateStats]);

  const handleToggleRun = () => {
    const newIsRunning = !isRunning;
    setIsRunning(newIsRunning);
    addLog(newIsRunning ? 'Simulation Started.' : 'Simulation Paused.', 'info');
  };
  
  const toggleEmergency = () => {
    const newEmergencyState = !stats.emergencyActive;
    setStats(prev => ({...prev, emergencyActive: newEmergencyState}));
    addLog(newEmergencyState ? 'Emergency Priority Activated!' : 'Emergency Priority Deactivated.', 'emergency');
    
    setVehicles(prev => {
        if(prev.some(c => c.isEmergency)){
            return prev.map(c => ({...c, isEmergency: false}));
        }
        if(prev.length > 0){
            const newVehicles = [...prev];
            const randomIndex = Math.floor(Math.random() * newVehicles.length);
            newVehicles[randomIndex].isEmergency = true;
            return newVehicles;
        }
        return prev;
    });
  };

  const applyQuantumOptimization = () => {
    addLog('Quantum optimization triggered.', 'quantum');
  };

  const setLightStateManually = useCallback((intersectionId: number, direction: 'NS' | 'EW') => {
    addLog(`Manual override for Intersection ${intersectionId + 1}: ${direction} set to GREEN.`, 'warning');
    setIntersections(prev => 
        prev.map(int => {
            if (int.id === intersectionId) {
                const newLights = [...int.lights];
                if (direction === 'NS') {
                    newLights[0].state = LightState.GREEN;
                    newLights[1].state = LightState.GREEN;
                    newLights[2].state = LightState.RED;
                    newLights[3].state = LightState.RED;
                } else { // EW
                    newLights[0].state = LightState.RED;
                    newLights[1].state = LightState.RED;
                    newLights[2].state = LightState.GREEN;
                    newLights[3].state = LightState.GREEN;
                }
                newLights.forEach(l => l.timer = 999); // Prevent auto-switch
                return { ...int, lights: newLights as [any, any, any, any], manualOverride: true };
            }
            return int;
        })
    );
  }, [addLog]);

  const returnToAuto = useCallback((intersectionId: number) => {
    addLog(`Intersection ${intersectionId + 1} returned to automatic control.`, 'info');
    setIntersections(prev =>
        prev.map(int => {
            if (int.id === intersectionId) {
                const newLights = int.lights.map(l => ({ ...l, timer: INITIAL_LIGHT_DURATION }));
                return { ...int, manualOverride: false, lights: newLights as [any, any, any, any] };
            }
            return int;
        })
    );
  }, [addLog]);


  return { isRunning, setIsRunning: handleToggleRun, simulationSpeed, setSimulationSpeed, weather, setWeather: handleSetWeather, intersections, vehicles, stats, logs, toggleEmergency, applyQuantumOptimization, setLightStateManually, returnToAuto };
};

export default useTrafficSimulation;