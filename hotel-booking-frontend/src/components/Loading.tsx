import React, { useEffect, useState } from 'react';
import { PlaneTakeoff } from 'lucide-react';
import '../assets/Loading.css';


const Loading: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
        }, 30000);

        return () => clearTimeout(timeout);
    }, [onFinish]);

    if (!visible) return null;

    return (
        <div className="loading-container">
            <PlaneTakeoff size={64} className="plane-icon" />
            <p><strong>Carregando...</strong></p>
        </div>
    );
};

export default Loading;
