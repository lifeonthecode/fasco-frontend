
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {

    const { user, loading } = useSelector((state) => state.auth);
    if (loading) {
        return <p className='text-7xl text-red-500'>Loading</p>
    }
    if (user?.role !== 'admin') {
        return <Navigate to={'/products'} replace />;
    }

    return children
};

export default AdminRoute;