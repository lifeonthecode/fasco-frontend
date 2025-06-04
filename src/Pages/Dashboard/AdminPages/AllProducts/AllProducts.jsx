import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleProduct, getProducts } from '../../../../App/Features/Product/productSlice';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AllProducts = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    console.log('products:', products)

    const handleDeleteProduct = async (id) => {
        console.log('id check: ', id)


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

                const response = await dispatch(deleteSingleProduct(id)).unwrap();

                Swal.fire({
                    title: "Deleted!",
                    text: response.message,
                    icon: "success"
                });
                dispatch(getProducts());
            }
        });
    }


    if (loading) return (<div className='flex items-center justify-center'>
        <p className='text-7xl text-red-500'>Loading</p>
    </div>)


    return (
        <div className='w-full bg-white'>
            <div>

                <div className='flex items-center justify-center mb-10'>
                    <h3 className='text-3xl text-black font-semibold capitalize font-poppins'>Products</h3>
                </div>

                <div className='flex flex-col gap-8'>

                    <div className='flex items-center justify-between'>
                        <button className='text-xl text-black font-medium capitalize font-poppins'>product image</button>
                        <button className='text-xl text-black font-medium capitalize font-poppins'>product details</button>
                        <button className='text-xl text-black font-medium capitalize font-poppins'>product actions</button>
                    </div>
                    <div className='flex flex-col gap-6'>

                        {
                            products?.products?.map((product) => (

                                <div key={product?._id} className='flex items-center justify-between p-4 border border-[#5932ea] rounded-lg'>
                                    <div className='max-w-[200px] w-full max-h-[200px] h-full'>
                                        <img className='max-w-[200px] w-full max-h-[200px] h-full object-cover rounded-2xl' src={product?.images[0]?.url} alt={product?.name} />
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <h5 className='text-lg text-black font-poppins capitalize font-medium'>{product?.name}</h5>
                                        <p className='text-base text-black font-poppins capitalize font-medium'>Original Price: {product?.originalPrice}</p>
                                        <p className='text-base text-black font-poppins capitalize font-medium'>Discount Price: {product?.discountPrice}</p>
                                        <p className='text-base text-black font-poppins capitalize font-medium'>Brand: {product?.brand}</p>
                                        <p className='text-base text-black font-poppins capitalize font-medium'>Stock: {product?.stock}</p>
                                        <p className='text-base text-black font-poppins capitalize font-medium flex items-center gap-3'>star:
                                            <div className='flex items-center gap-2'>
                                                {
                                                    [...Array(Math.ceil(product?.star))]?.map((_, index) => (
                                                        <span key={index}><FaStar color='red' /></span>
                                                    ))
                                                }
                                            </div>
                                        </p>
                                    </div>

                                    {/* actions  */}
                                    <div className='flex items-center gap-6'>
                                        <Link to={`/dashboard/admin/update/${product?._id}`} className='btn bg-success text-base text-black font-semibold capitalize font-poppins'>update</Link>
                                        <Link to={'/dashboard/admin/deals'} className='btn bg-[#5932ea] text-base text-white font-semibold capitalize font-poppins'>add deals</Link>
                                        <button onClick={() => handleDeleteProduct(product?._id)} className='btn bg-red-500 text-base text-white font-semibold capitalize font-poppins'>delete</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AllProducts;