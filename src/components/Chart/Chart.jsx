import { Paper } from "@mui/material";
import { Doughnut } from "react-chartjs-2"
import { useStateValue } from "../../StateProvider";
import useTransactions from "../../useTransactions";
import "./Chart.css"
import PropTypes from "prop-types"

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

Chart.propTypes = {
  title:PropTypes.string
}

export default Chart
