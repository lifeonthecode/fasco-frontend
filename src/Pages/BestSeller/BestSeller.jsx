import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestProducts } from './../../App/Features/Product/productSlice';
import { FaStar } from 'react-icons/fa';

const BestSeller = () => {

    const dispatch = useDispatch();
    const { bestProducts, loading } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchBestProducts())
    }, [dispatch]);


    return (
        <div className="w-full bg-white pt-[20px] pb-[50px]">
            <div className="lg:container mx-auto">

                {/* header title  */}
                <div className="text-center mb-10">
                    <h3 className="text-3xl text-[#484848] font-normal capitalize mb-5">Best seller Products</h3>
                </div>


                {
                    loading ? <div className="flex items-center justify-center">
                        <span className="loading loading-spinner text-primary loading-xl"></span>
                    </div>
                        :
                        <div className="grid grid-cols-3 gap-8">
                            {
                                bestProducts?.map((product) => (
                                    <div key={product?._id} className="bg-white shadow-lg p-5 rounded-md ">
                                        <div className="w-full max-h-[244px] h-full mb-2.5">
                                            <img className="w-full h-full object-cover rounded-md" src={product?.images[0]?.url} alt={product?.name} />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between gap-8">
                                                <div>

                                                    <h4 className="text-xl text-[#484848] font-poppins font-medium capitalize mb-2">{product.name}</h4>
                                                    <p className="text-base text-[#8a8a8a] font-poppins font-normal">{product.description}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {
                                                        [...Array(Math.ceil(product?.star))].map((_, index) => (
                                                            <span key={index}><FaStar size={'1.5rem'} color="#fca120" /></span>

                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-5">
                                                <p className="text-2xl text-[#484848] font-poppins font-medium">${product?.discountPrice}</p>
                                                {
                                                    product?.stock > 0 ?
                                                        <span className="text-base text-[#ff4646] font-poppins capitalize font-medium">stock: {product?.stock}</span>

                                                        :
                                                        <span className="text-base text-[#ff4646] font-poppins capitalize font-normal">almost sold out</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default BestSeller;