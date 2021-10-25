import { Paper } from "@mui/material"
import { Doughnut } from "react-chartjs-2"
import "./Charts.css"




const Charts = ({title,total, chartData}) => {
  return (
    <Paper elevation={4} className="charts">
      <h2 className="charts__title">{title}</h2>
      <h5 className="charts__total">{total}</h5>
      <Doughnut data={chartData}/>
    </Paper>
  )
}

export default Charts
