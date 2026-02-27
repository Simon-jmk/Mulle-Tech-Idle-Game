import { NavLink } from 'react-router-dom';
import { HandIndexThumbFill, Stack } from 'react-bootstrap-icons';

export const Navbar = () => {
  return (
    <nav className="bottom-navbar">
      <NavLink 
        to="/button" 
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="nav-icon">
          <HandIndexThumbFill size={24} />
        </div>
        <span className="nav-label">Button</span>
      </NavLink>
      <NavLink 
        to="/goals" 
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="nav-icon">
          <Stack size={24} />
        </div>
        <span className="nav-label">Goals</span>
      </NavLink>
    </nav>
  );
};
