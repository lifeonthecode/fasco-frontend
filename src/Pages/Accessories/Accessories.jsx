import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accessoriesProducts } from '../../App/Features/Product/productSlice';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Accessories = () => {
    const dispatch = useDispatch();
    const { accessories, loading } = useSelector((state) => state.product);
    const [activeCategory, setCategory] = useState('mens_fashion');


    useEffect(() => {
        dispatch(accessoriesProducts({ category: activeCategory })).unwrap();
    }, [dispatch, activeCategory]);

    const newArrivalsCategories = [
        {
            id: 1,
            name: "men's fashion",
            category: "mens_fashion"
        },
        {
            id: 2,
            name: "women's fashion",
            category: "womens_fashion"
        },
        {
            id: 3,
            name: "women accessories",
            category: "women_accessories"
        },
        {
            id: 4,
            name: "men accessories",
            category: "men_accessories"
        },
        {
            id: 4,
            name: "discount deals",
            category: "discount_deals"
        },
    ];
    return (
        <div className="w-full bg-white pt-[20px] pb-[50px]">
            <div className="lg:container mx-auto">

                {/* header title  */}
                <div className="text-center mb-10">
                    <h3 className="text-3xl text-[#484848] font-normal capitalize mb-5">Accessories</h3>
                </div>

                {/* categories  */}
                <div className="flex items-center justify-center gap-10 mb-10">
                    {
                        newArrivalsCategories.map((item, index) => (
                            <button
                                className={`text-base font-poppins font-normal capitalize cursor-pointer ${item.category === activeCategory ? 'px-6 py-2.5 bg-black rounded-sm text-white' : 'text-[#8a8a8a] '}`}
                                key={index}
                                onClick={() => {
                                    setCategory(item?.category)
                                }}
                            >{item.name}</button>
                        ))
                    }
                </div>

                {
                    loading ? <div className="flex items-center justify-center">
                        <span className="loading loading-spinner text-primary loading-xl"></span>
                    </div>
                        :
                        <div className="grid grid-cols-3 gap-8">
                            {
                                accessories?.map((product) => (
                                    <div key={product.id} className="bg-white shadow-lg p-5 rounded-md ">
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

export default Accessories;