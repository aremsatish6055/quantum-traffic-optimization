## Repo context — quick orientation

- This is a React + TypeScript UI that simulates a 3x3 traffic grid and exposes controls for manual override, emergency priority, and a "quantum optimizer" explanation feature.
- Core state & logic: `hooks/useTrafficSimulation.ts` — the single-hook source of truth that drives intersections, vehicles, simulation ticks, logs and stats. Treat it as the backend API for the UI.
- UI composition: `components/Dashboard.tsx` composes the app. Key components:
  - `TrafficGrid.tsx` — visual grid + roads + overlays. Reads `intersections`, `vehicles`, `trafficDensity`, and `weather` from the hook.
  - `ControlPanel.tsx` — start/pause, speed, emergency toggle, density map toggle.
  - `QuantumOptimizerPanel.tsx` — triggers `services/geminiService.getQuantumOptimizationExplanation(stats)` and renders the returned markdown/explanation.
  - `ManualOverridePanel.tsx` — calls `setLightStateManually` and `returnToAuto` from the hook.

## Data flow & invariants an agent should know

- The main hook `useTrafficSimulation` returns a compact API: { isRunning, setIsRunning, simulationSpeed, setSimulationSpeed, weather, setWeather, intersections, vehicles, stats, logs, toggleEmergency, applyQuantumOptimization, setLightStateManually, returnToAuto }.
- UI components do not mutate simulation internals directly — they call the hook's functions. When editing behavior, change the hook first unless UI-only.
- Intersection lights: each intersection has `lights: [N, S, E, W]` and a `manualOverride` flag. Setting `timer` to a large value is used to prevent auto-switching when manual.
- Traffic geometry constants (GRID_SIZE, LANE_WIDTH, INTERSECTION_SIZE) appear both in the hook and `TrafficGrid.tsx`. Keep them consistent when changing the world size.

## Integration & external dependencies

- `services/geminiService.ts` wraps a call to Google Gemini (`GoogleGenAI`) using `process.env.API_KEY`. If no key found it returns a mocked explanation. Key agent tasks:
  - If you change model behavior, update `getQuantumOptimizationExplanation`.
  - Environment: the Gemini API key is read from `API_KEY` env var.
- UI uses `framer-motion` for animations and Tailwind-like utility classes for styling — follow existing patterns for class names and motion variants.

## Project-specific patterns and conventions

- Single-hook simulation: prefer adding new simulation features inside `useTrafficSimulation.ts`. Add new exported functions on the returned object for UI access.
- Stats shape: `SimulationStats` (referenced across components) includes `trafficDensity`, `vehicleThroughput`, `sensorAccuracy`, and `historicalWaitTime`. When adding fields, update `StatsPanel` and any consumer that lists `stats` props.
- Logging: use `addLog(message, type)` inside the hook rather than writing directly to `logs` state from components.
- Manual override pattern: `setLightStateManually(intersectionId, 'NS'|'EW')` sets `manualOverride=true` and uses `timer=999` to freeze transitions; `returnToAuto` resets `timer` to the initial duration.

## Concrete examples for common agent tasks

- To implement a new dashboard control that changes global weather:
  - Add UI in `AdvancedSettingsPanel.tsx` and call `setWeather(newWeather)` from the hook.

- To change how optimization results are applied:
  - `QuantumOptimizerPanel.tsx` currently only displays markdown from `getQuantumOptimizationExplanation(stats)`.
  - Edit `services/geminiService.ts` to include structured output (e.g., JSON) and then apply parsed signal timings inside `useTrafficSimulation.applyQuantumOptimization`.

## Important files to inspect when making changes

- `hooks/useTrafficSimulation.ts` — main logic; spawn/move vehicles, lights logic, stats.
- `services/geminiService.ts` — AI/generator integration and mock fallback.
- `components/TrafficGrid.tsx` — rendering and layout constants.
- `components/QuantumOptimizerPanel.tsx` — UI entrypoint for quantum optimization.
- `components/ManualOverridePanel.tsx` — example of component→hook control pattern.

## Small safety notes for agents

- Do not assume a build or test script exists: there is no top-level README or package manifest in the repo root we could discover. If you add new dependencies, update the package manifest used by the project (if present) and confirm install/run instructions with the dev.
- Changing environment integration: `services/geminiService.ts` uses `process.env.API_KEY`. Avoid hardcoding keys or exposing secrets in code.

If anything here is unclear or you want me to include short examples of the hook API surface (types and shapes) or a sample change (e.g., applying optimizer timings into the hook), tell me what to expand and I will iterate.
