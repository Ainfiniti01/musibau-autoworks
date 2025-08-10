import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', bookings: 30 },
  { name: 'Feb', bookings: 45 },
  { name: 'Mar', bookings: 28 },
  { name: 'Apr', bookings: 50 },
  { name: 'May', bookings: 38 },
  { name: 'Jun', bookings: 60 },
  { name: 'Jul', bookings: 42 },
  { name: 'Aug', bookings: 55 },
  { name: 'Sep', bookings: 48 },
  { name: 'Oct', bookings: 65 },
  { name: 'Nov', bookings: 52 },
  { name: 'Dec', bookings: 70 },
];

const BookingsChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Bookings Per Month</h3>
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
          <Line type="monotone" dataKey="bookings" stroke="#004040" activeDot={{ r: 8, fill: '#ECBE07' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingsChart;
