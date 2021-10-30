import { Paper } from "@mui/material";
import { Doughnut } from "react-chartjs-2"
import { useStateValue } from "../../StateProvider";
import useTransactions from "../../useTransactions";
import "./Chart.css"

function Chart({ title }) {

  const [{transactions}] = useStateValue()
  
  const {chartData} = useTransactions(title,transactions)
  
  return (
    <Paper className="chartContainer">
      <h1>{title}</h1>
      <Doughnut data={chartData}/>
    </Paper>
  )
}

export default Chart
