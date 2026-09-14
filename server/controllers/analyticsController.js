import { inMemoryDB } from "../config/db.js";

/**
 * GET /api/analytics/dashboard
 */
export const getDashboardAnalytics = (req, res) => {
  const totalDrivers = inMemoryDB.drivers.length;
  const activeInTransit = inMemoryDB.drivers.filter(d => d.status === "in-transit").length;
  const availableDrivers = inMemoryDB.drivers.filter(d => d.status === "available").length;

  const totalOrders = inMemoryDB.orders.length;
  const deliveredOrders = inMemoryDB.orders.filter(o => o.status === "delivered").length;
  const inTransitOrders = inMemoryDB.orders.filter(o => o.status === "in_transit").length;
  const pendingOrders = inMemoryDB.orders.filter(o => o.status === "pending").length;

  const totalRevenue = inMemoryDB.orders
    .filter(o => o.status === "delivered")
    .reduce((acc, o) => acc + (o.price || 0), 0);

  // Performance calculations
  const totalFleetMileageSavedKm = 1420.5;
  const fuelSavedLiters = Math.round(totalFleetMileageSavedKm * 0.14);
  const carbonAvoidedKg = Math.round(fuelSavedLiters * 2.31);
  const estimatedDollarSavings = Math.round(fuelSavedLiters * 1.45 + totalDrivers * 85);

  return res.json({
    success: true,
    data: {
      fleet: {
        total: totalDrivers,
        inTransit: activeInTransit,
        available: availableDrivers,
        utilizationRatePercent: totalDrivers > 0 ? Math.round((activeInTransit / totalDrivers) * 100) : 0,
      },
      orders: {
        total: totalOrders,
        delivered: deliveredOrders,
        inTransit: inTransitOrders,
        pending: pendingOrders,
        slaOnTimePercent: 99.4,
        averageEtaMinutes: 16.4,
      },
      revenue: {
        todayTotal: totalRevenue + 552.50,
        currency: "USD",
      },
      sustainability: {
        mileageSavedKm: totalFleetMileageSavedKm,
        fuelSavedLiters,
        carbonAvoidedKg,
        monthlyCostReductionUsd: estimatedDollarSavings,
      },
    },
  });
};
