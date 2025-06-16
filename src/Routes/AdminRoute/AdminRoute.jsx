
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {

    const { user, loading } = useSelector((state) => state.users);
    if (loading) {
        return <p className='text-7xl text-red-500'>Loading</p>
    }
    if (user?.role !== 'admin') {
        return <Navigate to={'/'} replace />;
    }

    return children
};

export default AdminRoute;