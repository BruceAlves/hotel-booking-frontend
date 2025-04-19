import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BedDouble, Plane, Car, Package, LogOut, Menu, LayoutGrid } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../actions/userActions';
import useUser from '../hooks/useUser';
import { BaggageClaim } from 'lucide-react';

import '../assets/Sidebar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useUser();
  const dispatch = useDispatch();

  const handleNavigate = (path: string) => {
    setSelected(path);
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo">BookUp.com</div>
      </div>

      <div className="texto">
        <BaggageClaim size={48} color="#1c8de9" style={{ marginRight: '12px' }} />
        <div>
          <h3>Descubra lugares incríveis.</h3>
          <p>Viva experiências inesquecíveis.</p>
        </div>
      </div>
      {user.username ? (
        <>
          <h2 className='usuario'>Olá, {user.username ? user.username : 'Usuário'}!</h2>
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
                <Icon size={16} /> {label}
              </button>
            ))}
            <button className="logout" onClick={handleLogout}>
              <LogOut size={16} /> Sair
            </button>
          </div>
        </>
      ) : (
        <div className="auth">
          <button onClick={() => navigate('/login')}>Login</button>
          <span>/</span>
          <button onClick={() => navigate('/register')}>Cadastrar</button>
        </div>
      )}
    </nav>
  );
};

const menuItems = [
  { path: '/home', label: 'Início', Icon: LayoutGrid },
  { path: '/hospedagem', label: 'Hospedagem', Icon: BedDouble },
  { path: '/voos', label: 'Voos', Icon: Plane },
  { path: '/carros', label: 'Aluguel de Carros', Icon: Car },
  { path: '/pacotes', label: 'Pacotes de Viagem', Icon: Package },
];

export default Navbar;
