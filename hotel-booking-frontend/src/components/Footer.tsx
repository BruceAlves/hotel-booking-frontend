import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#002B5B',
            color: '#ffff',
            marginTop: '40px',
            fontSize: '14px'
        }}>
            &copy; {new Date().getFullYear()} BookUp.com
        </footer>
    );
};

export default Footer;
