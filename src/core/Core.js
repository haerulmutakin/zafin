import { Route, Switch } from 'react-router-dom';
import RecapProvider from '_provider/RecapProvider';
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Survey from '../pages/Survey';
import Monthly from '../pages/Monthly';
import Summary from 'pages/summary';
import Admin from 'pages/Admin';

const Core = () => {
    return ( 
        <RecapProvider>
            <Navbar />
            <div className="main">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/monthly" component={Monthly} />
                <Route path="/survey" component={Survey} />
                <Route path="/summary" component={Summary} />
                <Route path="/admin" component={Admin} />
            </Switch>
            </div>
        </RecapProvider>
     );
}
 
export default Core;