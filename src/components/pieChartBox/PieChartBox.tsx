import './pieChartBox.scss';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Repo, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Mobile', value: 400, color: '#0088FE' },
    { name: 'Desktop', value: 300, color: '#00C49F' },
    { name: 'Laptop', value: 300, color: '#FFBB28' },
    { name: 'Tablet', value: 200, color: '#FF8042' },
];

const PieChartBox = (props) => {
    return (
        <div className="pieChartBox">
            <h1>Lead by source</h1>
            <div className="chart">
                <ResponsiveContainer width="99%" height={300}>
                <PieChart>
                    <Tooltip
                        labelStyle={{ display: 'none' }}
                        contentStyle={{ background: 'white', borderRadius: '5px' }}
                    />
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((item) => (
                            <Cell key={item.name} fill={item.color} />
                        ))}
                    </Pie>
                </PieChart>
                <ResponsiveContainer/>
            </div>
        </div>
    );
};

PieChartBox.propTypes = {};

export default PieChartBox;
