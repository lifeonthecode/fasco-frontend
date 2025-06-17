import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleProduct, getByAdminAllProducts } from '../../../../App/Features/Product/productSlice';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { BiPencil } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';

const AllProducts = () => {
    const dispatch = useDispatch();
    const { adminProducts, loading } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(getByAdminAllProducts());
    }, [dispatch]);


    const handleDeleteProduct = async (id) => {
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
                dispatch(getByAdminAllProducts());
            }
        });
    }




    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>

            {
                loading ? <div className="flex items-center justify-center">
                    <span className="loading loading-spinner text-primary loading-xl"></span>
                </div>

                    :

                    (

                        <div className="overflow-x-auto bg-white shadow rounded-xl">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3">Stock</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminProducts?.map((product) => (
                                        <tr
                                            key={product?._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3">
                                                <img
                                                    src={product?.images[0]?.url}
                                                    alt={product?.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-3 font-medium font-poppins capitalize">{product?.name}</td>
                                            <td className="px-4 py-3 text-green-600 font-semibold ont-poppins capitalize">
                                                ${product?.discountPrice}
                                            </td>
                                            <td className="px-4 py-3 ont-poppins capitalize">{product?.stock}</td>
                                            <td className="px-4 py-3 ont-poppins capitalize">{product?.category}</td>
                                            <td className="px-4 py-3 flex items-center gap-4">
                                                {/* /dashboard/admin/users */}
                                                <Link to={`/dashboard/admin/update/${product?._id} `} className="text-blue-600 hover:text-blue-800 cursor-pointer ont-poppins capitalize">
                                                    <BiPencil size={24} />
                                                </Link>
                                                <button onClick={() => handleDeleteProduct(product?._id)} className="text-red-600 hover:text-red-800 cursor-pointer ont-poppins capitalize">
                                                    <BsTrash2 size={24} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {adminProducts.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center py-5 text-gray-500 ont-poppins capitalize font-semibold">
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )
            }
        </div>
    );
};

export default AllProducts;