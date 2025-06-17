import React, { useEffect } from 'react';
import { BsEye, BsTrash2 } from 'react-icons/bs';
import { deleteSingleOrder, getAllOrdersByAdmin } from '../../../../App/Features/Order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const AllOrders = () => {
    const dispatch = useDispatch();
    const { adminOrders } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getAllOrdersByAdmin());

    }, [dispatch]);


    const handleDeleteOrder = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await dispatch(deleteSingleOrder(id)).unwrap();
                Swal.fire({
                    title: "Deleted!",
                    text: response.message,
                    icon: "success"
                });
                dispatch(getAllOrdersByAdmin());
            }
        });
    }



    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            <div className="overflow-x-auto bg-white shadow rounded-xl">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 text-lg font-semibold capitalize font-poppins">Order ID</th>
                            <th className="px-4 py-3 text-lg font-semibold capitalize font-poppins">Customer</th>
                            <th className="px-4 py-3 text-lg font-semibold capitalize font-poppins">Date</th>
                            <th className="px-4 py-3 text-lg font-semibold capitalize font-poppins">Total</th>
                            <th className="px-4 py-3 text-lg font-semibold capitalize font-poppins">Paid</th>
                            <th className="px-4 py-3 text-lg font-semibold capitalize font-poppins">Status</th>
                            <th className="px-4 py-3 text-lg font-semibold capitalize font-poppins">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminOrders?.map((order) => (
                            <tr key={order?._id} className="border-t hover:bg-gray-50 transition">
                                <td className="px-4 py-3 font-poppins cursor-pointer text-base">{order?._id}</td>
                                <td className="px-4 py-3 font-poppins cursor-pointer text-base capitalize">{order?.shippingAddress?.name || "Unknown"}</td>
                                <td className="px-4 py-3 font-poppins cursor-pointer text-base">
                                    {new Date(order?.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-green-600 font-semibold font-poppins cursor-pointer text-base">
                                    ${order?.totalAmount}
                                </td>
                                <td className="px-4 py-3">
                                    {order?.isPaid ? (
                                        <span className="text-green-600 font-medium font-poppins cursor-pointer text-base">Paid</span>
                                    ) : (
                                        <span className="text-red-600 font-medium font-poppins cursor-pointer text-base">Unpaid</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="capitalize bg-blue-100 text-blue-700 px-2 py-1 rounded  font-poppins cursor-pointer text-base">
                                        {order?.orderStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3 flex gap-3">
                                    <Link to={`/dashboard/admin/order/${order?._id}`} className="text-indigo-600 hover:text-indigo-800 font-poppins cursor-pointer text-base">
                                        <BsEye size={24} />
                                    </Link>
                                    
                                    <button onClick={() => handleDeleteOrder(order?._id)} className="text-red-600 hover:text-red-800 font-poppins cursor-pointer">
                                        <BsTrash2 size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {adminOrders.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-500 text-xl font-semibold font-poppins capitalize">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;