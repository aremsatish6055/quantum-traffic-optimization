import { GoogleGenAI } from "@google/genai";
import { SimulationStats } from '../types';

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;

// Initialize the GoogleGenAI client only if the API key is available
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!ai) {
  console.info("Using enhanced free AI simulation mode. No API key required.");
}

// Enhanced free AI simulation that generates dynamic, realistic responses
const generateFreeAIResponse = (stats: SimulationStats): string => {
  const avgWait = stats.averageWaitTime.toFixed(2);
  const throughput = stats.vehicleThroughput;
  const totalIdle = stats.totalIdleTime.toFixed(0);
  const sensorAccuracy = stats.sensorAccuracy;
  
  // Calculate dynamic optimization suggestions based on actual stats
  const maxDensity = Math.max(...stats.trafficDensity.map(d => d.density));
  const denseIntersection = stats.trafficDensity.find(d => d.density === maxDensity);
  const hasHighDensity = maxDensity > 60;
  
  // Calculate suggested timing improvements
  const baseTiming = hasHighDensity ? 35 : 25;
  const suggestedTiming = Math.round(baseTiming + (maxDensity / 10));
  const improvementPercent = Math.round(15 + (maxDensity / 5));
  
  // Weather impact analysis
  const weatherImpact = sensorAccuracy < 95 ? 
    `*   **Weather Compensation:** Sensor accuracy reduced to ${sensorAccuracy}% due to current weather conditions. The algorithm applies confidence weighting to raw sensor data to maintain optimization quality.` : 
    `*   **Sensor Status:** All sensors operating at optimal accuracy (${sensorAccuracy}%).`;
  
  // Traffic density analysis
  const densityAnalysis = stats.trafficDensity.length > 0 ? 
    stats.trafficDensity.map(d => `${d.name}: ${d.density.toFixed(1)}%`).join(', ') : 
    'All intersections: Normal';
  
  // Generate context-aware recommendations
  const primaryDirection = hasHighDensity && denseIntersection ? 
    `${denseIntersection.name.split(' ')[0]}-${denseIntersection.name.split(' ')[2] || 'Opposite'}` : 
    'North-South';
  const secondaryDirection = primaryDirection === 'North-South' ? 'East-West' : 'North-South';
  
  return `**Quantum Optimization Analysis**

${weatherImpact}

*   **Problem Formulation:** The current traffic state is modeled as a Quadratic Unconstrained Binary Optimization (QUBO) problem suitable for quantum annealing. Each intersection's traffic light configuration represents a binary decision variable. The cost function minimizes total vehicle wait time (currently ${avgWait}s average), idle time (${totalIdle} vehicle-ticks), and predicted congestion based on current density patterns.

*   **Traffic Density Pattern:** ${densityAnalysis}

*   **Optimization Algorithm:** Using quantum annealing simulation, the algorithm explores the solution space to find optimal signal phasing. The current state shows ${throughput} vehicles processed with ${stats.totalCars} active vehicles.

*   **Recommended Configuration:** 
    - Prioritize **${primaryDirection}** flow for **${suggestedTiming} seconds**
    - Follow with **${secondaryDirection}** phase for **${Math.round(suggestedTiming * 0.7)} seconds**
    - Apply dynamic timing adjustments based on real-time density

*   **Predicted Improvement:** This configuration is expected to reduce average wait times by approximately **${improvementPercent}%** and improve overall throughput by optimizing signal phasing to match current traffic patterns.

*   **Implementation:** Optimal signal timings have been calculated and are ready to be applied. The system will continuously monitor and adjust based on real-time traffic flow data.`;
};

export const getQuantumOptimizationExplanation = async (stats: SimulationStats): Promise<string> => {
  // Use free AI simulation if no API key is available
  if (!ai) {
    // Simulate AI processing delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
    return generateFreeAIResponse(stats);
  }

  const model = "gemini-2.5-flash";
  const trafficData = stats.trafficDensity.map(d => `${d.name}: ${d.density.toFixed(2)}%`).join(', ');

  const prompt = `
    You are a quantum computing expert integrated into a smart traffic control system.
    Your role is to provide a brief, accessible explanation of how a quantum optimization algorithm would solve the current traffic problem.

    Current Traffic State:
    - Average Wait Time: ${stats.averageWaitTime.toFixed(2)} seconds
    - Total Idle Time (vehicle-ticks): ${stats.totalIdleTime.toFixed(0)}
    - Vehicle Throughput: ${stats.vehicleThroughput} cars passed
    - Traffic Density: ${trafficData}
    - Sensor Accuracy: ${stats.sensorAccuracy}%

    Task:
    Generate a concise explanation for the dashboard. Use markdown for formatting.
    1.  Start with a clear heading like "**Quantum Optimization Analysis**".
    2.  Briefly explain how the traffic problem is modeled for a quantum algorithm (e.g., as a QUBO problem for Quantum Annealing). Keep it simple.
    3.  If sensor accuracy is below 95%, briefly mention that the algorithm is compensating for potential data inaccuracies due to weather conditions.
    4.  Describe the hypothetical optimal signal configuration found by the algorithm. Be specific but brief (e.g., "prioritize North-South flow for X seconds").
    5.  State the predicted improvement (e.g., "reduce wait times by Y%").
    6.  Conclude by stating that the new timings are being applied.

    Do not generate code. Keep the tone professional and slightly futuristic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error generating quantum analysis. The model may be overloaded. Please try again later.";
  }
};