import { useState } from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

const Cart = () => {

    const carts = [
        {
            id: '01',
            name: 'Product 1',
            image: '/products/product_1.png',
            price: 150,
            size: 'M',
            color: 'red',
            quantity: 1
        },
        {
            id: '02',
            name: 'Product 2',
            image: '/products/product_2.png',
            price: 120,
            size: 's',
            color: 'green',
            quantity: 5,
        },
        {
            id: '03',
            name: 'Product 3',
            image: '/products/product_3.png',
            price: 90,
            size: 'l',
            color: 'blue',
            quantity: 2,
            discount: 33,
            deliveryFee: 15
        },
    ]

    const [quantities, setQuantities] = useState(
        carts.reduce((acc, item) => {
            acc[item.id] = item?.quantity;
            return acc
        }, {})
    )

    // increase quantity handle 
    const handleIncrease = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] + 1
        }))
    }
    // decrease quantity handle 
    const handleDecrease = (id, quantity) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : quantity
        }))
    };


    // order summary 
    let discountParentage = null;
    const calculateTotal = (cartItems) => {
        return cartItems.reduce((acc, item) => {
            // product quantity 
            const quantity = item.quantity || 1;
            // subtotal price 
            const basePrice = item.price * quantity;
            discountParentage = item.discount

            // discount price
            const discountPrice = item?.discount ? ((basePrice * item.discount) / 100) : 0;

            // delivery fee 
            const deliveryFee = item?.deliveryFee || 0;


            // final price  
            const finalPrice = basePrice - discountPrice + deliveryFee;
            return {
                totalPrice: acc.totalPrice + finalPrice,
                subtotalPrice: acc.subtotalPrice + basePrice,
                discount: acc.discount + discountPrice,
                deliveryFee: acc.deliveryFee + deliveryFee,
                discountParentage: acc.discountParentage + discountParentage
            }


        }, {
            totalPrice: 0,
            subtotalPrice: 0,
            discount: 0,
            deliveryFee : 0,
        })
    }

    const { totalPrice, subtotalPrice, discount, deliveryFee } = calculateTotal(carts);
    // console.log('totalPrice: ', totalPrice)


    return (
        <div className='w-full bg-white py-[70px]'>
            <div className="lg:container mx-auto">

                {/* section header  */}
                <div className='mb-14 w-full flex items-center justify-center text-center'>
                    <h3 className='text-4xl text-black font-poppins font-semibold capitalize'>your cart</h3>
                </div>

                <div className="flex items-center justify-between gap-8">
                    {/* cart wrapper  */}
                    <div className="max-w-[715px] w-full flex flex-col gap-5 p-5 rounded-sm border-[#dadada] border-[1px]">
                        {
                            carts?.map((item) => (
                                <div key={item?.id} className=' flex items-center justify-between gap-6 border border-[#dadada] rounded-lg p-5'>
                                    {/* cart wrapper info */}
                                    <div className='w-full flex items-center gap-6'>
                                        <div className='max-w-[124px] w-full max-h-[124px] h-full bg-[#f0eeed] rounded-lg p-1.5 flex items-center justify-center'>
                                            <img src={item?.image} className='max-w-[100px] w-full max-h-[100px] h-full object-cover rounded-lg' alt={item?.name} />
                                        </div>
                                        <div className='flex flex-col gap-6'>
                                            <h4 className='text-xl text-black font-poppins font-medium capitalize'>{item?.name}</h4>
                                            <p className='text-base text-black capitalize font-normal flex items-center gap-3'>size: <span className='w-[40px] h-[40px] bg-[#dadada] rounded-sm flex items-center justify-center text-base font-poppins font-medium'>{item?.size}</span></p>

                                            <p className='text-base text-black capitalize font-normal flex items-center gap-3'>color: <span className='w-[40px] h-[40px] rounded-full flex items-center justify-center text-base font-poppins font-medium'
                                                style={{
                                                    backgroundColor: item?.color
                                                }}></span></p>
                                        </div>
                                    </div>

                                    {/* cart action wrapper  */}
                                    <div className='flex justify-between flex-col items-end gap-6'>
                                        <button className='cursor-pointer'><FaRegTrashAlt color='red' size={'1.5rem'} /></button>

                                        {/* quantity wrapper  */}
                                        <div className="flex items-center justify-between gap-5 max-w-[250px] w-full h-[46px] border-[#eeeeee] border-[1px] px-4 py-2">

                                            {/* decrease button  */}
                                            <button onClick={() => handleDecrease(item?.id, item?.quantity)} className='cursor-pointer'><FaMinus size={'1.25rem'} color='black' />
                                            </button>

                                            <input type="number" readOnly value={quantities[item?.id]} className='w-[50px] h-full outline-0 text-center text-base text-black' min={1} />

                                            {/* increase button  */}
                                            <button onClick={() => handleIncrease(item?.id)} className='cursor-pointer'><FaPlus size={'1.25rem'} color='black' /></button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* order summary wrapper  */}

                    <div className="max-w-[505px] w-full flex flex-col gap-8 p-5 rounded-sm border-[#dadada] border-[1px]">

                        <h3 className="text-3xl text-black font-poppins capitalize font-semibold">Order summary</h3>

                        {/* subtotal box  */}
                        <div className="flex items-center justify-between gap-8">

                            <h4 className="text-xl text-black font-poppins font-medium capitalize">subtotal</h4>
                            <span className="text-xl text-black ">${subtotalPrice}</span>
                        </div>
                        {/* discount box  */}
                        <div className="flex items-center justify-between gap-8">

                            <h4 className="text-xl text-black font-poppins font-medium capitalize">discount ({discountParentage}%)</h4>
                            <span className="text-xl text-red-500 ">${discount}</span>
                        </div>
                        {/* delivery box  */}
                        <div className="flex items-center justify-between gap-8">

                            <h4 className="text-xl text-black font-poppins font-medium capitalize">delivery fee</h4>
                            <span className="text-xl text-black ">{deliveryFee}$</span>
                        </div>
                        {/* total box  */}
                        <div className="flex items-center justify-between gap-8">

                            <h4 className="text-2xl text-black font-poppins font-medium capitalize">total</h4>
                            <span className="text-2xl text-black ">{totalPrice}</span>
                        </div>


                        {/* checkout box  */}
                        <div>
                            <button className="mt-5 w-full h-[56px] bg-black rounded-2xl cursor-pointer">
                                <Link to={'/checkout'} className="text-xl text-white font-medium font-poppins capitalize w-full h-full">got to checkout</Link>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;