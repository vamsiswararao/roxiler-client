import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const RenderPieChart=props=>{
    const {categoryData}=props
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6666', '#66FF99', '#FF8C00', '#FFD700'];
    console.log(categoryData)
    return(
        <PieChart width={800} height={400} >
        <Pie dataKey="itemCount"  cx={400} cy={200} outerRadius={150} fill="#8884d8" label 
        data={categoryData.map((entry, index) => ({
            ...entry,
            fill: COLORS[index % COLORS.length], // Assign color based on index
          }))}/>
        <Tooltip />
        <Legend />
      </PieChart>

    )
}

export default RenderPieChart