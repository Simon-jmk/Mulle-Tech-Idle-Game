import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bottom-navbar">
      <NavLink 
        to="/button" 
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="nav-icon">🔘</div>
        <span className="nav-label">Button</span>
      </NavLink>
      <NavLink 
        to="/goals" 
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="nav-icon">🎯</div>
        <span className="nav-label">Goals</span>
      </NavLink>
    </nav>
  );
};
