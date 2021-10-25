import Charts from "./components/Charts";
import Main from "./components/Main";
import "./index.css"
import {data} from "./randomData.js"

const App = () => {
  return (
    <div className="app">
      {/* left side income chart */}
      <Charts title='Income' total="$100" chartData={data}/>

      {/* middle form for adding transactions */}
      <Main/>

      {/* right side expense chart */}
      <Charts title="Expense" total="$50" chartData={data}/>
    </div>
  );
};

export default App;
