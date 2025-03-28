
import { useSelector } from 'react-redux';
import { UserState } from '../types/userTypes';

const useUser = () => {
    return useSelector((state: { user: UserState }) => state.user);
};

export default useUser; 
