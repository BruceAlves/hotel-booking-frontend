import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BedDouble, Plane, Car, Package, LogOut, Menu, LayoutGrid } from 'lucide-react';
import '../assets/Sidebar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setSelected(path);
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">Booking Easy</div>
      <div className="menu-container">
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={28} color="white" />
        </div>

        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          {menuItems.map(({ path, label, Icon }) => (
            <button
              key={path}
              className={selected === path ? 'selected' : ''}
              onClick={() => handleNavigate(path)}
            >
              <Icon size={20} /> {label}
            </button>
          ))}

          <button className="logout" onClick={handleLogout}>
            <LogOut size={20} /> Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

const menuItems = [
  { path: '/home', label: 'Inicio', Icon: LayoutGrid },
  { path: '/hospedagem', label: 'Hospedagem', Icon: BedDouble },
  { path: '/voos', label: 'Voos', Icon: Plane },
  { path: '/carros', label: 'Aluguel de Carros', Icon: Car },
  { path: '/pacotes', label: 'Pacotes de Viagem', Icon: Package },
];

export default Navbar;
