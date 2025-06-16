import { Link } from 'react-router';
import { FaStar } from "react-icons/fa6";

const ProductCard = ({ products }) => {
    return (
        <>
            {
                products?.map((product, index) => {
                    return (
                        <div key={index} className='flex flex-col gap-5 p-3 min-h-[531px] h-full min-w-[326px] w-full'>
                            <div className='w-full min-h-[400px] h-full relative'>
                                <img src={product?.images[0]?.url} className='w-full h-full object-cover' alt={product?.name} />

                                {
                                    product?.stock !== 0 ? <div className='absolute top-1/2 left-1/2 right-0 bottom-0 text-center transform translate-y-1/2 translate-x-1/2 bg-red-500 w-14 h-14 rounded-full flex items-center justify-center'>
                                        {
                                            <span className='text-lg text-white'>{product?.stock}</span>
                                        }
                                    </div>
                                        :
                                        <div className='absolute top-[50%] left-[50%] transform translate-1/2 bg-red-500'>
                                            {
                                                <span className='text-lg text-white'>sold out</span>
                                            }
                                        </div>
                                }

                            </div>


                            <div className='flex flex-col gap-3'>
                                <div className='flex items-center justify-between'>

                                    <h4 className='text-2xl text-black font-normal capitalize'>{product?.name}</h4>
                                    <div className='flex items-center justify-center gap-2'>
                                        {
                                            [...Array(Math.ceil(product?.star))]?.map((_, index) => (

                                                <span className='cursor-pointer' key={index} ><FaStar size={'1.25rem'} /></span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <p className='text-base text-black font-poppins font-normal capitalize'>$

                                    {
                                        product?.originalPrice > product?.discountPrice ? product?.discountPrice : product?.originalPrice
                                    }
                                </p>

                                <div className=''>
                                    <button className='py-1 px-2.5 bg-gray-500 rounded text-white'>{product?.size}</button>
                                </div>
                                <div className='flex items-center justify-between gap-3'>
                                    <div className='flex items-center gap-1'>
                                        {
                                            product?.colors?.map((color, index) => {
                                                return (
                                                    <button
                                                        key={index}
                                                        className='w-[26px] h-[26px] rounded-full cursor-pointer'
                                                        style={{
                                                            background: color
                                                        }}
                                                    ></button>
                                                )
                                            })
                                        }
                                    </div>

                                    <div>
                                        <Link to={`/products/${product?._id}`} className='text-base text-black font-poppins font-medium capitalize border-b-2 border-[#484848]'>view details</Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
};

export default ProductCard;