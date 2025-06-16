import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { addToCartAndUpdate, deleteSingleCart, fetchCarts } from "../../App/Features/Cart/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartLists, loading } = useSelector((state) => state.cart);
    const { userId } = useParams();
    const [quantities, setQuantities] = useState({})

    const { cart: carts, totalPrice, subtotal, totalItems, totalDiscount, discount } = cartLists
    console.log(userId)
    useEffect(() => {
        dispatch(fetchCarts(userId));

    }, [dispatch, userId]);
    console.log(cartLists)

    // check products from cart length and set quantities
    useEffect(() => {
        if (carts?.products?.length) {
            const initialQuantities = carts?.products?.reduce((acc, item) => {
                acc[item?._id] = item?.quantity;
                return acc
            }, {});
            setQuantities(initialQuantities)
        }
    }, [carts]);

    console.log('cartList: ', cartLists)


    // handle update cart function 
    const handleUpdateCart = async (_id, cart, actionType) => {
        try {
            const quantity = actionType === 'increase' ? quantities[_id] + 1 : quantities[_id] - 1;
            const cartData = {
                userId,
                productId: cart?.product?._id,
                quantity,
                selectedColor: cart?.selectedColor,
                selectedSize: cart?.selectedSize,
            };

            const response = await dispatch(addToCartAndUpdate(cartData)).unwrap();
            console.log('update: ', response)
            dispatch(fetchCarts(userId))
            toast.success(response.message, {
                position: 'top-right'
            });


        } catch (error) {
            toast.error(error.message, {
                position: 'top-right'
            })
        }
    };

    // increase quantity handle 
    const handleIncrease = async (_id, cart) => {
        setQuantities(prev => ({
            ...prev,
            [_id]: prev[_id] + 1
        }));

        // console.log(quantities[_id] + 1, 'increase func')
        await handleUpdateCart(_id, cart, 'increase')

    }
    // decrease quantity handle 
    const handleDecrease = async (_id, quantity, cart) => {
        setQuantities(prev => ({
            ...prev,
            [_id]: prev[_id] > 1 ? prev[_id] - 1 : quantity
        }));
        // console.log(quantities[_id] - 1, 'decrease func')
        await handleUpdateCart(_id, cart, 'decrease');

    };


    // handle cart delete function 
    const handleDeleteCart = async (userId, productId) => {
        try {

            console.log('userId: ', userId, 'productId:', productId);

            const response = await dispatch(deleteSingleCart({ userId, productId })).unwrap();
            dispatch(fetchCarts(userId));

            toast.success(response.message, {
                position: 'top-center'
            });

        } catch (error) {
            toast.error(error.message, {
                position: 'top-center'
            })
        }
    }




    // cart is loading and that's show loading 
    if (loading) {
        return <div className="flex items-center justify-center">
            <p className="text-4xl text-green-700">Cart Loading</p>
        </div>
    }


    return (
        <div className='w-full bg-white py-[70px]'>

            {
                carts?.products?.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-[400px]">
                        <h3 className="text-4xl text-black font-poppins font-semibold">Your cart is Empty</h3>
                    </div>
                )

                    : (

                        <div className="lg:container mx-auto">

                            {/* section header  */}
                            <div className='mb-14 w-full flex items-center justify-center text-center'>
                                <h3 className='text-4xl text-black font-poppins font-semibold capitalize'>your cart</h3>
                            </div>

                            <div className="flex items-center justify-between gap-8">
                                {/* cart wrapper  */}
                                <div className="max-w-[715px] w-full flex flex-col gap-5 p-5 rounded-sm border-[#dadada] border-[1px]">
                                    {
                                        carts?.products?.map((cart) => {

                                            console.log('cart:', cart)
                                            return (
                                                <div key={cart?._id} className=' flex items-center justify-between gap-6 border border-[#dadada] rounded-lg p-5'>
                                                    {/* cart wrapper info */}
                                                    <div className='w-full flex items-center gap-6'>
                                                        <div className='max-w-[124px] w-full max-h-[124px] h-full bg-[#f0eeed] rounded-lg p-1.5 flex items-center justify-center'>
                                                            <img src={cart?.product?.images[0]?.url} className='max-w-[100px] w-full max-h-[100px] h-full object-cover rounded-lg' alt={cart?.name} />
                                                        </div>
                                                        <div className='flex flex-col gap-6'>
                                                            <h4 className='text-xl text-black font-poppins font-medium capitalize'>{cart?.product?.name}</h4>
                                                            <div>

                                                                <p className='text-base text-black capitalize font-medium font-poppins'>Price ${cart?.product?.originalPrice}</p>

                                                                {cart?.product?.originalPrice > cart?.product?.discountPrice &&

                                                                    (
                                                                        <p className='text-base text-black capitalize font-medium font-poppins flex items-center gap-3'> save
                                                                            <span className='px-3 py-1.5 bg-[#da3f3f] text-base text-white rounded-lg capitalize'> ${cart?.product?.originalPrice - cart?.product?.discountPrice}

                                                                            </span>
                                                                        </p>
                                                                    )}
                                                            </div>
                                                            <p className='text-base text-black capitalize font-normal flex items-center gap-3'>size: <span className='w-[40px] h-[40px] bg-[#dadada] rounded-sm flex items-center justify-center text-base font-poppins font-medium'>{cart?.selectedSize}</span></p>

                                                            <p className='text-base text-black capitalize font-normal flex items-center gap-3'>color: <span className='w-[40px] h-[40px] rounded-full flex items-center justify-center text-base font-poppins font-medium'
                                                                style={{
                                                                    backgroundColor: cart?.selectedColor
                                                                }}></span></p>
                                                        </div>
                                                    </div>

                                                    {/* cart action wrapper  */}
                                                    <div className='flex justify-between flex-col items-end gap-6'>
                                                        <button onClick={() => handleDeleteCart(userId, cart?.product?._id)} className='cursor-pointer'><FaRegTrashAlt color='red' size={'1.5rem'} /></button>

                                                        {/* quantity wrapper  */}
                                                        <div className="flex items-center justify-between gap-5 max-w-[250px] w-full h-[46px] border-[#eeeeee] border-[1px] px-4 py-2">

                                                            {/* decrease button  */}
                                                            <button onClick={() => handleDecrease(cart?._id, cart?.quantity, cart)} className='cursor-pointer'><FaMinus size={'1.25rem'} color='black' />
                                                            </button>
                                                            <input type="number" readOnly value={quantities[cart?._id]} className='w-[50px] h-full outline-0 text-center text-base text-black' min={1} />

                                                            {/* increase button  */}
                                                            <button onClick={() => handleIncrease(cart?._id, cart)} className='cursor-pointer'><FaPlus size={'1.25rem'} color='black' /></button>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                {/* order summary wrapper  */}

                                <div className="max-w-[505px] w-full flex flex-col gap-8 p-5 rounded-sm border-[#dadada] border-[1px]">

                                    <h3 className="text-3xl text-black font-poppins capitalize font-semibold">Order summary</h3>

                                    {/* total order box  */}
                                    <div className="flex items-center justify-between gap-8">

                                        <h4 className="text-xl text-black font-poppins font-medium capitalize">total orders</h4>
                                        <span className="text-xl text-black capitalize">{totalItems} order</span>
                                    </div>
                                    {/* subtotal box  */}
                                    <div className="flex items-center justify-between gap-8">

                                        <h4 className="text-xl text-black font-poppins font-medium capitalize">subtotal</h4>
                                        <span className="text-xl text-black ">${subtotal}</span>
                                    </div>
                                    {/* discount box  */}
                                    <div className="flex items-center justify-between gap-8">

                                        <h4 className="text-xl text-black font-poppins font-medium capitalize">discount  ({discount}%) </h4>
                                        <span className="text-xl text-red-500 ">${totalDiscount}</span>
                                    </div>
                                    {/* delivery box  */}
                                    <div className="flex items-center justify-between gap-8">

                                        <h4 className="text-xl text-black font-poppins font-medium capitalize">delivery fee</h4>
                                        <span className="text-xl text-black ">$60</span>
                                    </div>
                                    {/* total box  */}
                                    <div className="flex items-center justify-between gap-8">

                                        <h4 className="text-2xl text-black font-poppins font-medium capitalize">total</h4>
                                        <span className="text-2xl text-black ">${totalPrice + 60}</span>
                                    </div>


                                    {/* checkout box  */}
                                    <div>
                                        <button className="mt-5 w-full h-[56px] bg-black rounded-2xl cursor-pointer">
                                            <Link to={'/checkout'} className="text-xl text-white font-medium font-poppins capitalize w-full h-full">go to checkout</Link>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default Cart;