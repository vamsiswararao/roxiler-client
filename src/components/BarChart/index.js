import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RenderBarChart = props => {
    const {priceRanges} =props
    return (
      <BarChart width={600} height={400} data={priceRanges}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="priceRange" />
        <YAxis dataKey="itemCount"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="itemCount" fill="#8884d8" />
      </BarChart>
    );
  };

export default RenderBarChart
