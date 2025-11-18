// frontend/src/utils/api.js

export async function get(endpoint) {
  console.log('GET:', endpoint);
  if (endpoint === '/api/services.php') {
    // Dummy data for services
    return [
      { id: 1, title: 'Oil Change', description: 'Standard oil change service', category: 'Maintenance' },
      { id: 2, title: 'Tire Rotation', description: 'Rotate tires for even wear', category: 'Maintenance' },
      { id: 3, title: 'Brake Inspection', description: 'Inspect brake system for safety', category: 'Inspection' },
      { id: 4, title: 'Engine Diagnostics', description: 'Diagnose engine performance issues', category: 'Diagnostics' },
      { id: 5, title: 'Wheel Alignment', description: 'Align wheels for optimal handling', category: 'Alignment' },
      { id: 6, title: 'Air Conditioning Service', description: 'Service and recharge AC system', category: 'Service' },
      { id: 7, title: 'Battery Check', description: 'Test battery health and charge', category: 'Check' },
      { id: 8, title: 'Exhaust System Repair', description: 'Repair or replace exhaust components', category: 'Repair' },
      { id: 9, title: 'Transmission Fluid Change', description: 'Change transmission fluid for smooth operation', category: 'Service' },
      { id: 10, title: 'Coolant Flush', description: 'Flush and refill cooling system', category: 'Service' },
    ];
  }
  // Dummy data for other endpoints
  return { status: 'success', message: 'Dummy data' };
}

export async function post(endpoint, payload) {
  console.log('POST:', endpoint, payload);
  // Dummy response for POST requests
  if (payload && payload.action === 'delete' && endpoint === '/api/services.php') {
    return { status: 'success', message: 'Service deleted successfully!' };
  }
  if (endpoint === '/api/services.php' && !payload.id) {
    return { status: 'success', message: 'Service added successfully!', id: Math.floor(Math.random() * 1000) };
  }
  if (endpoint === '/api/services.php' && payload.id) {
    return { status: 'success', message: 'Service updated successfully!' };
  }
  return { status: 'success', message: 'Dummy data' };
}
