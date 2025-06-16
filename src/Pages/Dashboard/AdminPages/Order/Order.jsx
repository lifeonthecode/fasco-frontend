import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSingleOrder, updateOrderStatusByAdmin } from '../../../../App/Features/Order/orderSlice';
import { toast } from 'react-toastify';

const Order = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order } = useSelector(state => state.order);
    // const [orderStatus, setOrderStatus] = useState('')

    useEffect(() => {

        dispatch(getSingleOrder(id))

    }, [dispatch, id]);


    const handleUpdateOrderStatus = async (orderId, orderStatus) => {
        console.log('id: ', id, "orderStatus: ", orderStatus)
        try {
            const res = await dispatch(updateOrderStatusByAdmin({orderId, orderStatus})).unwrap();
            toast.success(res.message, { position: 'top-right' });
            dispatch(getSingleOrder(orderId));

        } catch (error) {
            toast.error(error.message, { position: 'top-right' });
        }
    }

    // console.log('order: ', order);

    // console.log('order status: ', orderStatus)

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 font-poppins capitalize">Order Details</h2>

            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="font-semibold font-poppins capitalize text-lg">Order ID</h3>
                    <p className='text-base font-poppins capitalize font-normal'>{order?._id}</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="font-semibold font-poppins capitalize text-lg">Order Date</h3>
                    <p className='font-poppins capitalize text-base font-normal'>{new Date(order?.createdAt).toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="font-semibold font-poppins capitalize text-lg">Total Amount</h3>
                    <p className="text-green-600 font-bold font-poppins capitalize text-base">${order?.totalAmount}</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="font-semibold font-poppins capitalize text-lg">Payment Status</h3>
                    <p className={order?.isPaid ? "text-green-600 font-poppins capitalize text-base" : "text-red-600 font-poppins capitalize text-base"}>
                        {order?.isPaid ? "Paid" : "Unpaid"}
                    </p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="font-semibold font-poppins capitalize text-lg">Delivery Status</h3>
                    <p className="font-poppins capitalize font-normal text-base">{order?.orderStatus}</p>
                </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h3 className="text-lg font-bold mb-2 font-poppins capitalize">Customer Information</h3>
                <p className='font-poppins capitalize text-base font-normal'><strong>Name:</strong> {order.shippingAddress?.name}</p>
                <p className='text-base font-normal font-poppins capitalize'><strong>Email:</strong> {order.user?.email}</p>
                <p className='text-base font-normal font-poppins capitalize'><strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order?.shippingAddress?.country}</p>
            </div>

            {/* Order Items */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h3 className="text-lg font-bold mb-4 font-poppins capitalize">Ordered Products</h3>
                <div className="space-y-4">
                    {order?.products?.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 border-b pb-4">
                            <img src={item?.product?.images[0]?.url} alt={item?.product?.name} className="w-18 h-18 object-cover rounded" />
                            <div>
                                <h4 className="font-semibold font-poppins capitalize text-lg">{item?.product?.name}</h4>
                                <p className='font-poppins capitalize text-base font-normal'>Qty: {item?.quantity}</p>
                                <p className='font-poppins capitalize text-base font-normal'>Size: {item?.selectedSize}</p>
                                <p className='font-poppins capitalize text-base font-normal'>Color: <span className="inline-block w-4 h-4 rounded-full border" style={{ backgroundColor: item?.selectedColor }} /></p>
                                <p className='font-poppins capitalize text-base font-normal'>Price: ${item?.product?.discountPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Admin Action (Optional: update status) */}
            <div className="bg-white p-4 shadow rounded">
                <h3 className="text-lg font-bold mb-2 font-poppins capitalize">Update Delivery Status</h3>
                <select
                    className="border p-2 rounded mt-2 font-poppins capitalize text-base"
                    defaultValue={order?.orderStatus}
                    onChange={(e) => {
                        // console.log("Update delivery status to:", e.target.value);
                        // setOrderStatus(e.target.value)
                        handleUpdateOrderStatus(id, e.target.value)
                    }}
                >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                </select>
            </div>
        </div>
    );
};

export default Order;