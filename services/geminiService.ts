import { GoogleGenAI } from "@google/genai";
import { SimulationStats } from '../types';

const API_KEY = process.env.API_KEY;

// Fix: Initialize the GoogleGenAI client only if the API key is available to prevent runtime errors.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!ai) {
  // This is a placeholder check. In a real environment, the key should be set.
  console.warn("Gemini API key not found. Using mock data.");
}

export const getQuantumOptimizationExplanation = async (stats: SimulationStats): Promise<string> => {
  // Fix: Check for the existence of the 'ai' instance instead of the API_KEY.
  if (!ai) {
    return new Promise(resolve => setTimeout(() => {
      resolve(`**Mock Quantum Analysis:**

*   **System Status:** Compensating for reduced sensor accuracy (${stats.sensorAccuracy}%) due to adverse weather.
*   **Problem Formulation:** The traffic flow is mapped to a Quadratic Unconstrained Binary Optimization (QUBO) problem. Each traffic light's state is a binary variable. The objective is to minimize a cost function representing total vehicle wait time and predicted congestion, factoring in data uncertainty.
*   **Optimization Result:** The simulation suggests prioritizing North-South flow for the next 45 seconds, followed by a 25-second phase for East-West traffic. This configuration is predicted to reduce average wait times by 18%.
*   **Applied Changes:** Light timings have been adjusted to reflect this optimal solution.`);
    }, 1500));
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