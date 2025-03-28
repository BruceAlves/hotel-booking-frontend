
import React from 'react';
import '../assets/ModalCheckIn.css'; // Você pode estilizar o modal como desejar

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode; // Permite passar conteúdo para o modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
