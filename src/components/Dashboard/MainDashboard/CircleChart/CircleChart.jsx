import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function CircleChart() {
    const demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

    return (
        <PieChart width={100} height={100}>
            <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={20}
            // outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            startAngle={-270}
            endAngle={150}
            stroke='none'
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
        </PieChart>
    );
}
