import { NavLink } from 'react-router-dom';
import { Home, Package, Receipt, Flame } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/inventory" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <Package size={24} />
        <span>Inventory</span>
      </NavLink>
      <NavLink to="/expenses" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <Receipt size={24} />
        <span>Expenses</span>
      </NavLink>
      <NavLink to="/diet" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <Flame size={24} />
        <span>Diet</span>
      </NavLink>
    </nav>
  );
}
