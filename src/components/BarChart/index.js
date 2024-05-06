import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./index.css"

const RenderBarChart = props => {
    const {priceRanges} =props
    return (
      <>
      <div className='laptopview'>
        <BarChart width={600} height={400}  data={priceRanges}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="priceRange" />
        <YAxis dataKey="itemCount"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="itemCount" fill="#8884d8" />
      </BarChart>
      </div>
      <div className='mobileview'>
        <BarChart width={250} height={200}  data={priceRanges}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="priceRange" />
        <YAxis dataKey="itemCount"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="itemCount" fill="#8884d8" />
      </BarChart>
      </div>
      </>
      
    );
  };

export default RenderBarChart
