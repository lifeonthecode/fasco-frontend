import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../App/Features/Product/productSlice';
import { toast } from 'react-toastify';
import { addToCartAndUpdate, fetchCarts } from '../../App/Features/Cart/cartSlice';
import { addWishlist, fetchWishlist } from '../../App/Features/Wishlist/wishlistSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [dispatch, id]);

    // console.log('single product: ', product)

    const [selectedProduct, selectProduct] = useState({
        size: '',
        color: '',
        quantity: 1,
    });

    const [activeImage, setActiveImage] = useState({
        imageIndex: 0,
    });

    // const productDetailsInfo = [
    //     {
    //         productId: id,
    //         images: [
    //             {
    //                 id: 1,
    //                 image: '/products/product_1.png'
    //             },
    //             {
    //                 id: 2,
    //                 image: '/products/product_2.png'
    //             },
    //             {
    //                 id: 3,
    //                 image: '/products/product_3.png'
    //             },
    //             {
    //                 id: 4,
    //                 image: '/products/product_4.png'
    //             },
    //             {
    //                 id: 5,
    //                 image: '/products/product_5.png'
    //             },
    //             {
    //                 id: 6,
    //                 image: '/products/product_6.png'
    //             },
    //         ],
    //         productName: `Product ${id}`,
    //         price: 100,
    //         sizes: [
    //             {
    //                 id: 1,
    //                 size: 'S'
    //             },
    //             {
    //                 id: 2,
    //                 size: 'M'
    //             },
    //             {
    //                 id: 3,
    //                 size: 'L'
    //             },
    //             {
    //                 id: 4,
    //                 size: 'XL'
    //             },
    //         ],
    //         colors: [
    //             {
    //                 id: 1,
    //                 color: 'blue'
    //             },
    //             {
    //                 id: 2,
    //                 color: 'green'
    //             },
    //         ],
    //         stock: 5,
    //         discount: 33,
    //         rating: 4.5
    //     }


    // ];

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

    console.log('selectedProduct: ', selectedProduct)


    // add to cart handle 
    const handleAddToCart = async (id) => {
        // userId, productId, quantity, selectedSize, selectedColor
        const cartData = {
            userId: user?._id,
            productId: id,
            quantity: selectedProduct.quantity,
            selectedColor: selectedProduct.color.trim(),
            selectedSize: selectedProduct.size.trim(),
        }

        try {

            const response = await dispatch(addToCartAndUpdate(cartData)).unwrap();
            dispatch(fetchCarts(user?._id));

            toast.success(response.message, {
                position: 'top-center'
            })

        } catch (error) {
            toast.error(error.message, {
                position: 'top-center'
            })
        }
    }


    // add to wishlist handle
    const handleAddToWishlist = async (id) => {
        try {

            if (!user?._id) {
                throw new Error('Please login to add product to wishlist');
            }
            const response = await dispatch(addWishlist({ userId: user?._id, productId: id })).unwrap();
            if (response.success) {
                dispatch(fetchWishlist(user?._id));
                toast.success(response.message, {
                    position: 'top-center'
                })
            } 
            
        } catch (error) {
            toast.error(error.message, {
                position: 'top-center'
            })
        }
    }


    if (loading) {
        return <div className="flex items-center justify-center">
            <p className="text-4xl text-green-700">Product Details Loading</p>
        </div>
    }

    return (
        <div className='w-full pt-[70px] pb-[70px]'>
            <div className="lg:container mx-auto">
                <div>
                    <div className='flex gap-10'>
                        {/* image wrapper  */}
                        <div className='flex w-auto max-h-[660px] h-full gap-4'>
                            <div className='flex flex-col gap-3'>
                                {
                                    product?.images?.map((image, index) => {
                                        // console.log(image?.url, 'product details image')
                                        return (
                                            <button onClick={() => setActiveImage({
                                                imageIndex: index
                                            })} className={`cursor-pointer ${activeImage.imageIndex === index && 'border-[4px] border-red-500'}`} key={index}>

                                                <img src={image?.url} className='w-[70px] h-[93px] object-cover' alt={image?.public_id} />
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className='w-full f-full'>
                                <img src={product?.images[activeImage.imageIndex].url} className='min-w-[491px] w-full max-h-[660px] h-full object-cover' />
                            </div>
                        </div>
                        {/* product details  */}
                        <div className='max-w-[660px] w-full flex flex-col gap-6'>
                            <div className="flex items-center justify-between">

                                <h1 className='text-3xl text-black font-normal capitalize'>{product?.name}</h1>

                                <button onClick={() => handleAddToWishlist(id)} className='w-[46px] h-[46px] bg-[#eeeeee] rounded-lg flex items-center justify-center cursor-pointer'>

                                    <span className='cursor-pointer'><CiStar color={'red'} size={'2rem'} /></span>
                                </button>
                            </div>
                            <div className='flex items-center gap-3.5'>
                                {
                                    product?.star && (
                                        <div className='flex items-center gap-2'> <span className='text-base font-medium text-black font-poppins capitalize'>rating</span>

                                            {
                                                [...Array(Math.ceil(product?.star))]?.map((_, index) => (
                                                    <span key={index}><FaStar size={'1.25rem'} color='black' /></span>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                <span className='text-lg text-black capitalize'>({product?.star})</span>
                            </div>

                            <p className='text-2xl text-black flex items-center gap-5'>Price
                                ${product?.originalPrice}
                                {
                                    product?.discount &&
                                    <span className='px-3 py-1.5 bg-[#da3f3f] text-base text-white rounded-lg capitalize'>save: {product?.originalPrice * product?.discount / 100}</span>
                                }
                            </p>

                            {/* size box  */}
                            <div className='flex flex-col gap-2.5'>
                                <p className='text-base text-black capitalize flex items-center gap-5'>size:
                                    {
                                        selectedProduct?.size && <span className='w-[40px] h-[40px] bg-[#eeeeee] rounded-lg flex items-center justify-center  cursor-pointer border-[3px] border-red-500 uppercase'>{selectedProduct?.size}</span>
                                    }
                                </p>
                                <div className='flex items-center gap-3'>
                                    {
                                        product?.sizes?.map((size, index) => (
                                            <button
                                                key={index}
                                                className='w-[45px] h-[45px] bg-[#eeeeee] rounded-lg flex items-center justify-center border-[#eeeeee] border-[2px] cursor-pointer uppercase'
                                                onClick={() => selectProduct({
                                                    ...selectedProduct,
                                                    size: size
                                                })}
                                            >{size}</button>
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
                                        product?.colors?.map((color, index) => (
                                            <button
                                                key={index}
                                                className={`w-[40px] h-[40px] rounded-full cursor-pointer`}
                                                style={{
                                                    backgroundColor: color
                                                }}
                                                onClick={() => selectProduct({
                                                    ...selectedProduct,
                                                    color: color
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

                                    <button onClick={() => handleAddToCart(id)} className='min-w-[442px] w-full h-[46px] border-[#eeeeee] border-[2px] rounded-lg text-xl text-black capitalize cursor-pointer'>add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;