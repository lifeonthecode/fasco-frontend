import { toast } from "react-toastify";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCarts } from "../../App/Features/Cart/cartSlice";
import axiosInstance from "../../App/Api/axiosInstance";
const stripePromise = loadStripe('pk_test_51RL3euHHyFADS5JCVtPLTwSJhPNY5agnDahywYLOflVu5kUdloXvCDGrc2moDP1BKFSCVO2cQTd4NrdjoakzUgYT00LoB2iTpV'); // Replace this
const Checkout = () => {

    const dispatch = useDispatch();
    const { cartLists } = useSelector((state) => state.cart);
    const { cart, subtotal, totalPrice, totalItems,totalDiscount } = cartLists;
    const { user } = useSelector((state) => state.users);
    const [deliveryCharge, setDeliveryCharge] = useState(50); // Default delivery charge
    const [deliveryAddress, setDeliveryAddress] = useState({}); // Default delivery address
    const [clientSecret, setClientSecret] = useState(''); // Default delivery address

    // get cartItems 
    useEffect(() => {

        dispatch(fetchCarts(user?._id));

    }, [dispatch, cart, user?._id]);

    const handlePaymentSuccess = async (e) => {
        e.preventDefault();

        try {

            const response = await axiosInstance.post('payment/create-payment-intent', {
                amount:totalPrice,
                shippingAddress: deliveryAddress.city,
            });

            console.log("Payment session created:", response.data);
            setDeliveryCharge(response.data.deliveryCharge); // Update delivery charge from response
            setClientSecret(response.data.clientSecret); // Update delivery charge from response
            setDeliveryAddress(response.data.shippingAddress); // Update delivery address from response
            // console.log("Payment processing...");
        } catch (error) {
            toast.error("Payment failed. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error("Payment error:", error);
        }
    };

    // console.log(cartLists)
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setDeliveryAddress({
            ...deliveryAddress,
            [name]: value
        });
    };

    // console.log('deliveryAddress', deliveryAddress)


    return (
        <div className='w-full bg-white py-[70px]'>
            <div className="lg:container mx-auto">
                {/* section header  */}
                <div className='flex items-center justify-center w-full mb-10'>
                    <h3 className='text-4xl text-black font-poppins capitalize font-semibold'>checkout form</h3>
                </div>

                <div className="flex items-center justify-between gap-10">
                    {/* delivery details wrapper  */}
                    <div className='max-w-[550px] w-full h-auto flex flex-col gap-7'>
                        <h3 className='text-3xl text-black font-poppins font-semibold capitalize'>deliver details</h3>
                        <div className='w-full'>
                            <form className='flex flex-col gap-6' onSubmit={handlePaymentSuccess}>

                                {/* first name box  */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="target_name" className='text-base text-black font-poppins font-normal capitalize cursor-pointer'>Name</label>

                                    <input onChange={handleInputChange} className='w-full outline-0 text-base text-black font-poppins font-normal pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='target_name' name="name" type="text" placeholder='First Name' required />
                                </div>

                                {/* street address box  */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="address" className='text-base text-black font-poppins font-normal cursor-pointer'>street address*</label>
                                    <input onChange={handleInputChange} className='w-full outline-0 text-base text-black font-poppins font-normal pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='address' name="address" type="text" placeholder='Street Address' required />
                                </div>

                                {/* town/city box  */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="city" className='text-base text-black font-poppins font-normal cursor-pointer'>town/city*</label>
                                    <input onChange={handleInputChange} className='w-full outline-0 text-base text-black font-poppins font-normal pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='city' name="city" type="text" placeholder='Town/City' required />
                                </div>

                                {/* postal box  */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="postalCode" className='text-base text-black font-poppins font-normal cursor-pointer'>postal code*</label>
                                    <input onChange={handleInputChange} className='w-full outline-0 text-base text-black font-poppins font-normal pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='postalCode' name="postalCode" type="text" placeholder='Postal Code' required />
                                </div>

                                {/* phone number box */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="phone" className='text-base text-black font-poppins font-normal cursor-pointer'>Phone number*</label>
                                    <input onChange={handleInputChange} className='w-full outline-0 text-base text-black font-poppins font-normal pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='phone' name="phone" type="text" placeholder='Phone Number' required />
                                </div>

                                {/* email box */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="email" className='text-base text-black font-poppins font-normal cursor-pointer'>email address*</label>
                                    <input onChange={handleInputChange} className='w-full outline-0 text-base text-black font-poppins font-normal pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='email' name="email" type="email" placeholder='Email Address' required />
                                </div>


                                {/* button box */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <button type="submit" className='w-full outline-0 text-base text-white font-poppins font-normal capitalize pl-3 rounded-xl h-[56px] cursor-pointer bg-black'>address confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>


                    {/* right side wrapper  */}
                    <div className="flex flex-col gap-7 bg-white p-6 rounded shadow-md w-full max-w-md border">
                        <div>

                            {
                                cart?.products?.length > 0 ? (
                                    cart?.products?.map((item) => (
                                        <div key={item._id} className='flex items-center justify-between gap-5 mb-5 w-full '>

                                            <div className="flex flex-col gap-5 w-full">
                                                <h3 className='text-2xl text-black font-poppins font-bold capitalize'>your order</h3>
                                                <div className='flex items-center justify-between gap-3 w-full'>
                                                    <img src={item?.product?.images[0].url} alt={item?.name} className='w-[70px] h-[70px] object-cover rounded-lg' />
                                                    <h3 className='text-base text-black font-poppins font-medium capitalize'>Name: {item?.product?.name}</h3>
                                                    <p className='text-base text-black font-poppins font-medium capitalize'>items: {item?.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h3 className='text-3xl text-black font-poppins font-semibold capitalize'>your no order</h3>
                                )
                            }

                            <div className="flex flex-col gap-3">
                                <h3 className='text-base text-black font-poppins font-semibold capitalize'>total orders: <span className='text-base text-black font-poppins font-medium'>{totalItems}</span></h3>

                                <h3 className='text-base text-black font-poppins font-semibold capitalize'>subtotal: <span className='text-base text-black font-poppins font-medium'>${subtotal}</span></h3>

                                <h3 className='text-base text-black font-poppins font-semibold capitalize'>discount: <span className='text-base text-black font-poppins font-medium'>${totalDiscount}</span></h3>


                                <h3 className='text-base text-black font-poppins font-semibold capitalize'>delivery charge: <span className='text-base text-black font-poppins font-medium'>${deliveryCharge}</span></h3>

                                <h3 className='text-base text-black font-poppins font-semibold capitalize'>total Amount: <span className='text-base text-black font-poppins font-medium'>${totalPrice + parseInt(deliveryCharge) }</span></h3>
                            </div>
                        </div>

                        {/* payment wrapper  */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm clientSecret={clientSecret} deliveryCharge={deliveryCharge} />
                        </Elements>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;