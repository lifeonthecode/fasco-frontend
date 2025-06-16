import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelledOrderByUser, getAllOrdersByUser } from "../../../../App/Features/Order/orderSlice";
import { toast } from "react-toastify";

const MyOrders = () => {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.users);
    const { orders, loading } = useSelector((state) => state.order);


    useEffect(() => {
        // Fetch all orders for the user when the component mounts
        if (user && user._id) {
            // Assuming you have an action to fetch orders by user ID
            // dispatch(getAllOrdersByUser(user._id));
            dispatch(getAllOrdersByUser(user?._id));
        }
    }, [user, dispatch]);
    // console.log(orderLists, "orderLists");

    const handleCanceledOrder = async (orderId) => {
        try {

            // Dispatch an action to cancel the order
            const response = await dispatch(cancelledOrderByUser(orderId)).unwrap();
            // Handle the response if needed
            if (response.success) {
                toast.success("Order cancelled successfully!");
                dispatch(getAllOrdersByUser(user?._id)); // Refresh the order list
            }
            // console.log("Order cancelled:", orderId);

        } catch (error) {
            toast.error("Failed to cancel order. Please try again." + error.message);
        }
    }


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            {loading ? (
                <div className="flex items-center justify-center">
                    <span className="loading loading-spinner text-primary loading-xl"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                                <th className="py-3 px-4 border-b">
                                    <h4 className="text-xl text-black font-medium capitalize font-poppins">
                                        Order ID
                                    </h4>
                                </th>
                                <th className="py-3 px-4 border-b">
                                    <h4 className="text-xl text-black font-medium capitalize font-poppins">
                                        Status
                                    </h4>
                                </th>
                                <th className="py-3 px-4 border-b">
                                    <h4 className="text-xl text-black font-medium capitalize font-poppins">
                                        Payment
                                    </h4>
                                </th>
                                <th className="py-3 px-4 border-b">
                                    <h4 className="text-xl text-black font-medium capitalize font-poppins">
                                        Total
                                    </h4>

                                </th>
                                <th className="py-3 px-4 border-b">
                                    <h4 className="text-xl text-black font-medium capitalize font-poppins">
                                        Date
                                    </h4>
                                </th>
                                <th className="py-3 px-4 border-b">
                                    <h4 className="text-xl text-black font-medium capitalize font-poppins">
                                        Action
                                    </h4>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                                <tr key={order._id} className="text-sm text-gray-700">
                                    <td className="py-3 px-4 border-b">{order?._id}</td>
                                    <td className="py-3 px-4 border-b">
                                        <span
                                            className={`px-4 py-2 rounded text-lg text-black font-medium capitalize font-poppins cursor-pointer ${order?.orderStatus === 'delivered' ? 'bg-green-500' : order?.orderStatus === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'}`}
                                        >
                                            {order?.orderStatus}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <p className="text-lg text-black font-medium capitalize font-poppins bg-green-400 px-4 py-2 rounded text-center">
                                            {order?.isPaid ? 'Paid' : 'unpaid'}
                                        </p>

                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <p className="text-lg text-black font-medium capitalize font-poppins">
                                            ${order?.totalAmount}
                                        </p>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <p className="text-lg text-black font-medium capitalize font-poppins">
                                            {new Date(order?.createdAt).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <button disabled={order?.orderStatus === 'cancelled' ? true : false} onClick={() => handleCanceledOrder(order?._id)} className={`text-lg text-black font-medium capitalize font-poppins px-4 py-2 rounded cursor-pointer ${order?.orderStatus === 'cancelled' ? 'bg-gray-500' : 'bg-red-500'}`}>cancelled</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;