import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthProvider from '_provider/AuthProvider';
import RouteGuard from '_helpers/RouteGuard';
import Login from 'pages/Login';
import Core from 'core/Core';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <RouteGuard path="/" component={Core} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
