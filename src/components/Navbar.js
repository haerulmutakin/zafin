import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar, faChartLine, faListAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return ( 
        <nav>
            <div className="nav">
                <h1>Zaida Finance</h1>
                <div className="menu">
                    <NavLink to="/" exact activeClassName="active">
                        <FontAwesomeIcon icon={faClock} />
                        <label>Harian</label>
                    </NavLink>
                    <NavLink to="/monthly" activeClassName="active">
                        <FontAwesomeIcon icon={faCalendar} />
                        <label>Bulanan</label>
                    </NavLink>
                    <NavLink to="/survey" activeClassName="active">
                        <FontAwesomeIcon icon={faListAlt} />
                        <label>Survey</label>
                    </NavLink>
                    <NavLink to="/summary" activeClassName="active">
                        <FontAwesomeIcon icon={faChartLine} />
                        <label>Ikhtisar</label>
                    </NavLink>
                    <NavLink to="/profile" activeClassName="active">
                        <FontAwesomeIcon icon={faUser} />
                        <label>Profil</label>
                    </NavLink>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;