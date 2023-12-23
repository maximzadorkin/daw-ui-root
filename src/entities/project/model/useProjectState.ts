import { useLocation } from 'react-router-dom';

const useProjectState = (): boolean => {
    const location = useLocation();

    return location.pathname.startsWith('/project/');
};

export { useProjectState };
