import React from 'react';
import { Link } from 'react-router';

const UserPanel = ({user, loading, wishlistLoading, wishlists, orderLoading, orders, cartLists}) => {
    return (
        <div>
            <div className="p-6 w-full space-y-6">
                <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
                    <img src={user?.avatar?.url} alt={user?.name} className="w-16 h-16 rounded-full" />
                    <div>
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                    {/* Cart Summary */}
                    <div className="bg-white p-4 shadow rounded-lg flex flex-col gap-3">
                        <h3 className="text-lg font-semibold mb-2 font-poppins">Cart Summary</h3>
                        {
                            loading ? <div className="flex items-center justify-center">
                                <span className="loading loading-spinner text-primary loading-xl"></span>
                            </div>

                                :
                                (

                                    <div className='flex flex-col gap-3'>

                                        <p className='text-base text-black font-poppins font-medium'>Total Items: {cartLists?.totalItems}</p>
                                        <p className='text-base text-black font-poppins font-medium'>Total Amount: ${cartLists?.totalPrice}</p>
                                        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded text-base cursor-pointer">
                                            <Link to={`/cart/${user?._id}`} className='inline-block'>
                                                View Cart
                                            </Link>
                                        </button>
                                    </div>
                                )
                        }
                    </div>

                    {/* Wishlist */}
                    <div className="bg-white p-4 shadow rounded-lg flex flex-col gap-3">
                        <h3 className="text-lg font-semibold mb-2 font-poppins">Wishlist</h3>


                        {
                            wishlistLoading ? <div className="flex items-center justify-center">
                                <span className="loading loading-spinner text-primary loading-xl"></span>
                            </div>
                                :
                                <div className='flex flex-col gap-3'>
                                    <ul className="space-y-1">
                                        {wishlists?.products?.map((item) => (
                                            <li key={item._id} className="text-base flex justify-between border-b pb-1 font-poppins font-medium">
                                                <span>{item.name}</span>
                                                <span>${item.discountPrice}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded text-base cursor-pointer capitalize">
                                        <Link to={`/dashboard/user/wishlist`} className='inline-block'>
                                            view wishlist
                                        </Link>
                                    </button>
                                </div>
                        }
                    </div>

                    {/* Orders */}
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 font-poppins">Orders</h3>

                        {
                            orderLoading ? <div className="flex items-center justify-center">
                                <span className="loading loading-spinner text-primary loading-xl"></span>
                            </div>
                                :

                                (

                                    <ul className="space-y-2">
                                        {orders?.map((order) => (
                                            <li key={order._id} className="text-base border p-2 rounded font-poppins font-medium flex flex-col gap-2.5">
                                                <div className="flex flex-col gap-3">
                                                    <span className='text-base text-black font-medium capitalize font-poppins'>Order #{order?._id}</span>
                                                    <span className={`font-medium ${order.status === 'Pending'
                                                        ? 'text-yellow-600'
                                                        : 'text-green-600'
                                                        }`}>
                                                        {order?.orderStatus
                                                        }
                                                    </span>
                                                </div>
                                                <div className="text-gray-500 text-sm font-poppins font-medium capitalize">
                                                    Date: {new Date(order?.orderDate).toLocaleDateString()} | Total: ${order?.totalAmount}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;