import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const UserRoute = ({children}) => {
    const {user} = useSelector((state) => state.auth);

    // if(loading) {
    //     return <p className='text-7xl text-red-700'>User Route Loading</p>
    // }

    if(user?.role !== 'user') {
        return <Navigate  to={'/dashboard'} replace />
    }

    return children
};

export default UserRoute;