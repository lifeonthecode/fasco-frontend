import React, { useState } from 'react';
import { useParams } from 'react-router';
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa";

const ProductDetails = () => {
    const { id } = useParams();

    const [selectedProduct, selectProduct] = useState({
        size: '',
        color: '',
        quantity: 1,
    });

    const [activeImage, setActiveImage] = useState({
        imageIndex: 0,
    });
    console.log(activeImage)

    const product = [
        {
            productId: id,
            images: [
                {
                    id: 1,
                    image: '/products/product_1.png'
                },
                {
                    id: 2,
                    image: '/products/product_2.png'
                },
                {
                    id: 3,
                    image: '/products/product_3.png'
                },
                {
                    id: 4,
                    image: '/products/product_4.png'
                },
                {
                    id: 5,
                    image: '/products/product_5.png'
                },
                {
                    id: 6,
                    image: '/products/product_6.png'
                },
            ],
            productName: `Product ${id}`,
            price: 100,
            sizes: [
                {
                    id: 1,
                    size: 'S'
                },
                {
                    id: 2,
                    size: 'M'
                },
                {
                    id: 3,
                    size: 'L'
                },
                {
                    id: 4,
                    size: 'XL'
                },
            ],
            colors: [
                {
                    id: 1,
                    color: 'blue'
                },
                {
                    id: 2,
                    color: 'green'
                },
            ],
            stock: 5,
            discount: 33,
            rating: 4.5
        }


    ];

    // quantity increase handle 
    const handleIncrease = () => {
        selectProduct({
            ...selectedProduct,
            quantity: selectedProduct.quantity + 1,
        })
    }


    // quantity decrease handle 
    const handleDecrease = () => {
        if (selectedProduct.quantity > 1) {
            selectProduct({
                ...selectedProduct,
                quantity: selectedProduct.quantity - 1,
            })
        }
    };


    return (
        <div className='w-full pt-[70px] pb-[70px]'>
            <div className="lg:container mx-auto">
                <div>
                    {
                        product?.map((item) => (
                            <div key={item?.key} className='flex gap-10'>
                                {/* image wrapper  */}
                                <div className='flex w-auto max-h-[660px] h-full gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        {
                                            item?.images?.map((imageItem, index) => (
                                                <button onClick={() => setActiveImage({
                                                    imageIndex: index
                                                })} className={`cursor-pointer ${activeImage.imageIndex === index && 'border-[4px] border-red-500'}`}>

                                                    <img src={imageItem?.image} className='w-[70px] h-[93px] object-cover' alt={imageItem?.id} />
                                                </button>
                                            ))
                                        }
                                    </div>
                                    <div className='w-full f-full'>
                                        <img src={item?.images[activeImage.imageIndex].image} className='min-w-[491px] w-full max-h-[660px] h-full object-cover' alt={item?.images[1].id} />
                                    </div>
                                </div>
                                {/* product details  */}
                                <div className='max-w-[660px] w-full flex flex-col gap-6'>
                                    <div className="flex items-center justify-between">

                                        <h1 className='text-3xl text-black font-normal capitalize'>{item?.productName}</h1>
                                        <span className='cursor-pointer'><CiStar size={'1.25rem'} color='black' /></span>
                                    </div>
                                    <div className='flex items-center gap-3.5'>
                                        <div className='flex items-center gap-2'>
                                            {
                                                [...Array(Math.ceil(item?.rating))]?.map((_, index) => (
                                                    <span key={index}><FaStar size={'1.25rem'} color='black' /></span>
                                                ))
                                            }
                                        </div>
                                        <span className='text-lg text-black capitalize'>({item?.rating})</span>
                                    </div>
                                    <p className='text-2xl text-black flex items-center gap-5'>
                                        ${item?.price}
                                        {
                                            item?.discount &&
                                            <span className='px-3 py-1.5 bg-[#da3f3f] text-base text-white rounded-lg capitalize'>save: {item?.discount}%</span>
                                        }
                                    </p>

                                    {/* size box  */}
                                    <div className='flex flex-col gap-2.5'>
                                        <p className='text-base text-black capitalize flex items-center gap-5'>size:
                                            {
                                                selectedProduct?.size && <span className='w-[40px] h-[40px] bg-[#eeeeee] rounded-lg flex items-center justify-center  cursor-pointer border-[3px] border-red-500'>{selectedProduct?.size}</span>
                                            }
                                        </p>
                                        <div className='flex items-center gap-3'>
                                            {
                                                item?.sizes?.map((sizeItem) => (
                                                    <button
                                                        key={sizeItem?.id}
                                                        className='w-[45px] h-[45px] bg-[#eeeeee] rounded-lg flex items-center justify-center border-[#eeeeee] border-[2px] cursor-pointer'
                                                        onClick={() => selectProduct({
                                                            ...selectProduct,
                                                            size: sizeItem?.size
                                                        })}
                                                    >{sizeItem?.size}</button>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* color box  */}
                                    <div className='flex flex-col gap-2.5'>
                                        <p className='text-base text-black capitalize flex items-center gap-5'>colors:
                                            {
                                                selectedProduct?.color && <span className='w-[40px] h-[40px] rounded-full flex items-center justify-center  cursor-pointer border-[3px] border-red-500 '
                                                    style={{
                                                        backgroundColor: `${selectedProduct?.color}`
                                                    }}></span>
                                            }
                                        </p>
                                        <div className='flex items-center gap-3'>
                                            {
                                                item?.colors?.map((colorItem) => (
                                                    <button
                                                        key={colorItem?.id}
                                                        className={`w-[40px] h-[40px] rounded-full cursor-pointer`}
                                                        style={{
                                                            backgroundColor: `${colorItem?.color}`
                                                        }}
                                                        onClick={() => selectProduct({
                                                            ...selectedProduct,
                                                            color: colorItem?.color
                                                        })}
                                                    ></button>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* quantity box  */}
                                    <div className='flex flex-col gap-2.5 w-full'>
                                        <p className='text-base text-black capitalize'>quantity</p>
                                        <div className='flex items-center justify-between w-full gap-10'>
                                            <div className="flex items-center justify-between gap-5 max-w-[250px] w-full h-[46px] border-[#eeeeee] border-[1px] px-4 py-2">

                                                {/* decrease button  */}
                                                <button onClick={handleDecrease} className='cursor-pointer'><FaMinus size={'1.25rem'} color='black' />
                                                </button>

                                                <input type="number" readOnly value={selectedProduct.quantity} className='w-[50px] h-full outline-0 text-center text-base text-black' min={1} />

                                                {/* increase button  */}
                                                <button onClick={handleIncrease} className='cursor-pointer'><FaPlus size={'1.25rem'} color='black' /></button>
                                            </div>

                                            <button className='min-w-[442px] w-full h-[46px] border-[#eeeeee] border-[2px] rounded-lg text-xl text-black capitalize cursor-pointer'>add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;