import { NavLink } from 'react-router-dom';
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" >Home</NavLink>
      <NavLink to="/products" end>Shop</NavLink>
      <NavLink to="/products/new" >Admin Portal</NavLink>
    </nav>
  );
}

export default NavBar;