import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import './chartBox.scss';

interface Props {
    color: string;
    icon: string;
    title: string;
    dataKey: string;
    number: number | string;
    percentage: number;
    chartData: object[];
  };

const ChartBox = (props:Props) => {
    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <img src= {props.icon} alt="" />
                    <span>{props.title}</span>
                </div>
                <h1>11.238</h1>
                <Link to="/" style={{color:props.color}}>View all</Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={props.chartData} >
                            <Tooltip labelStyle={{display:'none'}} contentStyle={{background:'transparent', border:'none'}}/>
                            <Line type="monotone" dataKey={props.dataKey} stroke={props.color}   strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <span className="percentage" style={{color: props.percentage < 0 ? 'tomato': "lightgreen"}} >{props.percentage}%</span>
                    <span className="duration">this month</span>
                </div>
            </div>
        </div>
    );
};

ChartBox.propTypes = {};

export default ChartBox;
