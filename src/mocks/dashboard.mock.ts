// Mock dashboard data for testing
// Simulates Laravel API responses

export const mockDashboard = {
  kpi: {
    totalMachines: 24,
    running: 18,
    idle: 3,
    offline: 2,
    maintenance: 1,
    efficiency: 87,
    oee: 82,
  },
  production: {
    hourly: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      produced: Math.floor(Math.random() * 100) + 50,
      target: 150,
    })),
  },
  machines: Array.from({ length: 24 }, (_, i) => ({
    id: `HT-${i}`,
    status: ['Running', 'Running', 'Idle', 'Offline', 'Running'][i % 5],
    operator: ['John D', 'Sarah S', 'Mike W', 'Emma R', 'James B'][i % 5],
    efficiency: 85 + (i % 15),
    oee: 75 + (i % 20),
  })),
};
