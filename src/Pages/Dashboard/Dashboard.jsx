import React, { useEffect } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdSell } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarts } from '../../App/Features/Cart/cartSlice';
import { fetchWishlist } from '../../App/Features/Wishlist/wishlistSlice';
import { getAllOrdersByAdmin, getAllOrdersByUser } from '../../App/Features/Order/orderSlice';
import UserPanel from '../../Components/userPanel/UserPanel';
import AdminOverviewPanel from '../../Components/AdminOverviewPanel/AdminOverviewPanel';
import { getByAdminAllProducts } from '../../App/Features/Product/productSlice';
import { fetchUsers } from '../../App/Features/User/userSlice';


const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, userLists } = useSelector(state => state.users);
    const { cartLists, loading } = useSelector(state => state.cart);
    const { adminCountTotalProducts } = useSelector(state => state.product);
    const { wishlists, loading: wishlistLoading } = useSelector(state => state.wishlist);
    const { adminOrders, totalOrders, totalRevenue, loading: orderLoading, orders } = useSelector(state => state.order);


    useEffect(() => {
        dispatch(fetchCarts(user?._id));
        dispatch(fetchWishlist(user?._id));
        dispatch(getAllOrdersByUser(user?._id));
        dispatch(getAllOrdersByAdmin());
        if(user?.role === 'admin') {
            dispatch(getByAdminAllProducts());
            dispatch(fetchUsers());
        }
    }, [dispatch, user]);

    const totalUsers = userLists?.length || 0;


    // console.log('wishlist: ', wishlists)

    return (
        <div>
            <div>
                {
                    user?.role === 'admin' ? (
                        <AdminOverviewPanel loading={orderLoading} orders={adminOrders} totalOrders={totalOrders} totalRevenue={totalRevenue} totalProducts={adminCountTotalProducts} totalUsers={totalUsers} />
                    )
                        :
                        (
                            <UserPanel user={user} loading={loading} wishlistLoading={wishlistLoading} wishlists={wishlists} orderLoading={orderLoading} orders={orders} cartLists={cartLists} />
                        )
                }
            </div>
        </div>
    );
};

export default Dashboard;