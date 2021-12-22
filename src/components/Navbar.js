import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar, faChartLine, faListAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return ( 
        <nav>
            <div className="nav">
                <h1>Zaida Finance</h1>
                <div className="menu">
                    <NavLink to="/" exact activeClassName="active">
                        <FontAwesomeIcon icon={faClock} />
                    </NavLink>
                    <NavLink to="/monthly" activeClassName="active">
                        <FontAwesomeIcon icon={faCalendar} />
                    </NavLink>
                    <NavLink to="/summary" activeClassName="active">
                        <FontAwesomeIcon icon={faChartLine} />
                    </NavLink>
                    <NavLink to="/survey" activeClassName="active">
                        <FontAwesomeIcon icon={faListAlt} />
                    </NavLink>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;