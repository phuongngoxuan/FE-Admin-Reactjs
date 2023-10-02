import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthChecker = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as any);
        console.log(user);
        if (!user?.accessToken) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, [navigate]);

    return null;
};

export default AuthChecker;
