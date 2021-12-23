import { Route, Switch } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Survey from '../pages/Survey';
import Monthly from '../pages/Monthly';
import RecapProvider from '_provider/RecapProvider';

const Core = () => {
    return ( 
        <RecapProvider>
            <Navbar />
            <div className="main">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/monthly" component={Monthly} />
                <Route path="/survey" component={Survey} />
            </Switch>
            </div>
        </RecapProvider>
     );
}
 
export default Core;