import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Services from '../pages/Services';

const data = [
  { name: 'Jan', Services: 30 },
  { name: 'Feb', Services: 45 },
  { name: 'Mar', Services: 28 },
  { name: 'Apr', Services: 50 },
  { name: 'May', Services: 38 },
  { name: 'Jun', Services: 60 },
  { name: 'Jul', Services: 42 },
  { name: 'Aug', Services: 55 },
  { name: 'Sep', Services: 48 },
  { name: 'Oct', Services: 65 },
  { name: 'Nov', Services: 52 },
  { name: 'Dec', Services: 70 },
];

const ServicesChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Services Per Month</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="services" stroke="#004040" activeDot={{ r: 8, fill: '#ECBE07' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServicesChart;
