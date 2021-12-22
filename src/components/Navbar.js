import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav>
            <div className="nav">
                <h1>Zaida Finance</h1>
                <div className="menu">
                    <NavLink to="/" exact activeClassName="active">Home</NavLink>
                    <NavLink to="/monthly" activeClassName="active">Bulanan</NavLink>
                    <NavLink to="/survey" activeClassName="active">Survey</NavLink>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;