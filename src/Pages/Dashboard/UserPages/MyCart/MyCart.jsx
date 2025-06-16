import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarts } from "../../../../App/Features/Cart/cartSlice";
import { Link } from 'react-router';

const MyCart = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const { cartLists } = useSelector((state) => state.cart);
    useEffect(() => {
        // Fetch cart items for the user when the component mounts
        if (user && user._id) {
            // Assuming you have an action to fetch cart items by user ID
            dispatch(fetchCarts(user?._id));
        }
    }, [user, dispatch]);

    const { cart, totalPrice } = cartLists;


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-xl font-semibold mb-4">🛒 My Cart</h2>

            {cart?.products?.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart?.products?.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-end justify-between bg-white p-4 rounded shadow-sm"
                        >
                            <div className="flex items-end gap-6 ">
                                <img
                                    src={item?.product?.images[0]?.url}
                                    alt={item?.product}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div>
                                    <p className="font-medium">{item?.product?.name}</p>
                                    <p className="text-xl text-gray-500 capitalize font-poppins">
                                        Price: ${item.product.originalPrice} × {item.quantity}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xl text-gray-500 capitalize font-poppins">
                                        discount Price: ${item.product.discountPrice} × {item.quantity}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xl text-gray-500 capitalize font-poppins">
                                        discount:{item.product?.discount}%
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold font-poppins capitalize">
                                total :${(item?.product?.originalPrice * item?.quantity)?.toFixed(2)}
                            </p>
                        </div>
                    ))}

                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="flex justify-between text-lg font-medium">
                            <span className='font-poppins'>Total</span>
                            <span className='font-poppins'>${totalPrice?.toFixed(2)}</span>
                        </div>
                        <button className='mt-6 w-full  bg-blue-600 py-2 rounded hover:bg-blue-700 transition'>
                            <Link to={'/checkout'} className=" text-white font-poppins capitalize">
                                Go to Checkout
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCart;