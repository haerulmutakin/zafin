import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Survey from 'pages/Survey';
import Graph from 'pages/Graph';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/monthly" component={Graph} />
            <Route path="/survey" component={Survey} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
