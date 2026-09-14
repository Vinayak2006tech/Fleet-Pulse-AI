import { solveTSPRoute } from "../services/tspService.js";

/**
 * POST /api/optimize/route
 * Takes origin depot and delivery stop array, returns 2-Opt TSP sequence
 */
export const optimizeRoute = (req, res) => {
  try {
    const { depot, stops } = req.body;

    const defaultDepot = depot || {
      id: "DEPOT-0",
      name: "Central Logistics Terminal Alpha",
      address: "100 Dispatch Way",
      x: 15,
      y: 50,
      type: "hub",
    };

    if (!stops || !Array.isArray(stops) || stops.length === 0) {
      return res.status(400).json({
        success: false,
        message: "An array of 'stops' is required for route optimization",
      });
    }

    const solution = solveTSPRoute(defaultDepot, stops);

    return res.json({
      success: true,
      data: solution,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
