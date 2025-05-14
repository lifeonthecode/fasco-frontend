import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ products }) => {
    return (
        <>
            {
                products?.map((product) => (
                    <div className='flex flex-col gap-5 p-3 min-h-[531px] h-full min-w-[326px] w-full'>
                        <div className='w-full min-h-[400px] h-full relative'>
                            <img src={product?.image} className='w-full h-full object-cover' alt={product?.productName} />

                            {
                                product?.stock === 0 && <div className='absolute top-1/2 left-1/2 transform translate-y-1/2 -translate-x-1/2 w-[70px] h-[70px] rounded-full bg-[#b1b1b1] flex items-center justify-center'>
                                    <span className='text-sm text-white font-semibold font-poppins capitalize'>sold out</span>
                                </div>
                            }

                        </div>
                        <div className='flex flex-col gap-3'>
                            <h4 className='text-2xl text-black font-normal capitalize'>{product?.productName}</h4>
                            <p className='text-base text-black font-poppins font-normal capitalize'>${product?.price}</p>
                            <div className='flex items-center justify-between gap-3'>
                                <div>
                                    {
                                        product?.color?.map((colorItem) => (
                                            <button
                                                key={colorItem?.id}
                                                className='w-[26px] h-[26px] rounded-full cursor-pointer'
                                                style={{
                                                    backgroundColor: colorItem?.color
                                                }}
                                            ></button>
                                        ))
                                    }
                                </div>

                                <div>
                                    <Link to={`/products/${product?.productId}`} className='text-base text-black font-poppins font-medium capitalize border-b-2 border-[#484848]'>view details</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default ProductCard;