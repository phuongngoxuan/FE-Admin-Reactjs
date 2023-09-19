import './barChartBox.scss';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
    title: string;
    color: string;
    dataKey: string;
    chartData: object[];
}

const BarChartBox = (props: Props) => {
    return (
        <div className="barChartBox">
            <h1>{props.title}</h1>
            <div className="chart">
                <ResponsiveContainer width="99%" height={150}>
                    <BarChart data={props.chartData}>
                        <Tooltip
                            cursor={{ fill: 'none' }}
                            labelStyle={{ display: 'none' }}
                            contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
                        />
                        <Bar dataKey={props.dataKey} fill={props.color} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

BarChartBox.propTypes = {};

export default BarChartBox;
