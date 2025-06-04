import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.users);

    if (loading) {
        return (
            <div>
                <p className="text-2xl text-red-600">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
