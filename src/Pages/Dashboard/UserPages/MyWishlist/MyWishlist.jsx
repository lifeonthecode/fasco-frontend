import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllWishlist, deleteSingleWishlist, fetchWishlist } from '../../../../App/Features/Wishlist/wishlistSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { FaRegTrashAlt } from "react-icons/fa";

const MyWishlist = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { wishlists, totalItems, loading } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist(user?._id));
    }, [dispatch, user?._id]);

    // Function to remove a product from the wishlist
    const removeFromWishlist = async (productId) => {
        try {
            const res = await dispatch(deleteSingleWishlist({ userId: user._id, productId })).unwrap();
            dispatch(fetchWishlist(user?._id)); // Refresh wishlist after deletion
            toast.success(res?.message, {'position': 'top-center'});

        } catch (error) {
            toast.error(error.message, {'position': 'top-center'})
        }
    };

    // handle all wishlist remove 
    const handleAllWishlistRemove = async (id) => {
        try {

            const res = await dispatch(deleteAllWishlist(id)).unwrap();
            toast.success(res?.message, {'position': 'top-center'});
            dispatch(fetchWishlist(user?._id)); // Refresh wishlist after deletion
            
        } catch (error) {
            toast.error(error.message, {'position': 'top-center'})
        }
    }


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className='flex justify-between pb-6'>
                <h2 className="text-2xl font-bold mb-4">My Wishlist {totalItems > 0 && (totalItems)}</h2>
                <button onClick={() => handleAllWishlistRemove(user?._id)} className='cursor-pointer flex items-center gap-2 text-2xl font-poppins font-semibold capitalize px-4 py-2 bg-black rounded'><FaRegTrashAlt color='red' size={'1.5rem'} /></button>
            </div>



            {
                loading ? <div className="flex items-center justify-center">
                    <span className="loading loading-spinner text-primary loading-xl"></span>
                </div>
                    :
                    wishlists?.products?.length === 0 ? (
                        <div className='flex items-center justify-center w-full h-full'>
                            <p className="text-gray-500 text-3xl font-poppins font-medium">Your wishlist is empty.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {wishlists?.products?.map((item) => {
                                // console.log("Wishlist Item:", item._id);
                                return (
                                    <div
                                        key={item._id}
                                        className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                                        <img
                                            src={item.images[0]?.url}
                                            alt={item.name}
                                            className=" w-full max-h-[250px] h-full object-cover rounded"
                                        />
                                        <div className='flex items-center justify-between w-full mt-2'>
                                            <h4 className="mt-3 font-semibold text-center">{item.name}</h4>
                                            <p className="text-gray-600">${item.originalPrice}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center gap-3 w-full">
                                            <Link
                                                to={`/products/${item._id}`}
                                                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => removeFromWishlist(item?._id)}
                                                className="text-sm text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50 cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
        </div>
    );
};

export default MyWishlist;