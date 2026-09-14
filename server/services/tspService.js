/**
 * Algorithmic TSP Route Optimizer Service
 * Implements Greedy Nearest-Neighbor + 2-Opt local search heuristic.
 */

// Euclidean distance calculation between two 2D points (supports either x/y or lat/lng)
export function calculateDistance(p1, p2) {
  const x1 = p1.x ?? p1.lng ?? 0;
  const y1 = p1.y ?? p1.lat ?? 0;
  const x2 = p2.x ?? p2.lng ?? 0;
  const y2 = p2.y ?? p2.lat ?? 0;
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export function calculateTotalDistance(path) {
  let dist = 0;
  for (let i = 0; i < path.length - 1; i++) {
    dist += calculateDistance(path[i], path[i + 1]);
  }
  return dist;
}

// 2-Opt segment reversal helper
function reverseSegment(tour, i, k) {
  while (i < k) {
    const temp = tour[i];
    tour[i] = tour[k];
    tour[k] = temp;
    i++;
    k--;
  }
}

/**
 * Solve Multi-Stop Traveling Salesperson Route
 * @param {Object} depot - Origin and return depot/hub
 * @param {Array} stops - Array of delivery stop objects
 * @returns {Object} Optimized sequence and benchmark metrics
 */
export function solveTSPRoute(depot, stops) {
  if (!stops || stops.length === 0) {
    return {
      path: [depot, depot],
      totalDistanceKm: 0,
      estimatedTimeMin: 0,
      fuelLiters: 0,
      savings: { distancePercent: 0, timeMin: 0, fuelLiters: 0, co2Kg: 0 }
    };
  }

  // Baseline: Naive sequence (as submitted in order)
  const naivePath = [depot, ...stops, depot];
  const naiveDistance = calculateTotalDistance(naivePath);

  // Step 1: Greedy Nearest-Neighbor Initial Solution
  const unvisited = [...stops];
  let current = depot;
  const optimizedTour = [depot];

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = calculateDistance(current, unvisited[0]);

    for (let i = 1; i < unvisited.length; i++) {
      const d = calculateDistance(current, unvisited[i]);
      if (d < minDistance) {
        minDistance = d;
        nearestIdx = i;
      }
    }

    current = unvisited.splice(nearestIdx, 1)[0];
    optimizedTour.push(current);
  }
  optimizedTour.push(depot); // Return to depot loop

  // Step 2: 2-Opt Local Search to eliminate edge crossings
  let improved = true;
  let iterations = 0;
  const maxIterations = 100;

  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;

    for (let i = 1; i < optimizedTour.length - 2; i++) {
      for (let k = i + 1; k < optimizedTour.length - 1; k++) {
        const d1 = calculateDistance(optimizedTour[i - 1], optimizedTour[i]);
        const d2 = calculateDistance(optimizedTour[k], optimizedTour[k + 1]);
        const d3 = calculateDistance(optimizedTour[i - 1], optimizedTour[k]);
        const d4 = calculateDistance(optimizedTour[i], optimizedTour[k + 1]);

        // If reversing the subsegment produces a shorter distance
        if (d3 + d4 < d1 + d2 - 1e-6) {
          reverseSegment(optimizedTour, i, k);
          improved = true;
        }
      }
    }
  }

  const optimizedDistance = calculateTotalDistance(optimizedTour);

  // Convert raw plane units into realistic fleet telemetry
  const scale = 1.85; // km per coordinate unit
  const naiveKm = Number((naiveDistance * scale).toFixed(1));
  const optimizedKm = Number((optimizedDistance * scale).toFixed(1));
  const distanceSavedPercent = naiveKm > 0 ? Math.max(0, Math.round(((naiveKm - optimizedKm) / naiveKm) * 100)) : 0;
  const timeSavedMinutes = Math.max(0, Math.round((naiveKm - optimizedKm) * 2.2));
  const fuelSavedLiters = Number(Math.max(0, (naiveKm - optimizedKm) * 0.14).toFixed(1));
  const co2AvoidedKg = Number((fuelSavedLiters * 2.31).toFixed(1));

  return {
    isOptimized: true,
    algorithm: "Greedy Nearest-Neighbor + 2-Opt Heuristic",
    stopCount: stops.length,
    path: optimizedTour,
    naivePath: naivePath,
    metrics: {
      distanceKm: optimizedKm,
      naiveDistanceKm: naiveKm,
      estimatedTimeMin: Math.round(optimizedKm * 2.1),
      estimatedFuelLiters: Number((optimizedKm * 0.12).toFixed(1)),
      savings: {
        distanceSavedPercent,
        timeSavedMinutes,
        fuelSavedLiters,
        co2AvoidedKg,
      }
    }
  };
}
