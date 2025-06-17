import { useState } from 'react';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../App/Features/Order/orderSlice';


const CheckoutForm = ({ clientSecret, shippingAddress}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const cardNumber = elements.getElement(CardNumberElement);
        const cardExpiry = elements.getElement(CardExpiryElement);
        const cardCvc = elements.getElement(CardCvcElement);



        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
            },
        });

        if (error) {
            toast.error('Payment Failed: ' + error.message);

        } else if (paymentIntent.status === 'succeeded') {
            const orderDetails = {
                ...shippingAddress,
                totalAmount: paymentIntent.amount / 100, // Convert cents to dollars
                paymentStatus: paymentIntent.status,
                orderStatus: 'processing',
            };
            const response = await dispatch(createOrder(orderDetails)).unwrap();
            if (response.success) {
                toast.success('Payment and order created successfully!');

                // clear card fields after successful payment
                cardNumber.clear();
                cardExpiry.clear(); 
                cardCvc.clear(); 
                e.target.reset(); // reset the form fields
            }
            else {
                toast.error('Order creation failed: ' + response.message);
            }

        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-4 '
        >
            <h2 className="text-2xl font-bold font-poppins">Payment</h2>

            {/* Card Details Inputs */}
            <div className="space-y-3">
                <div className="border p-2 rounded">
                    <CardNumberElement className="w-full outline-none" />
                </div>

                <div className="flex gap-3">
                    <div className="border p-2 rounded w-1/2">
                        <CardExpiryElement className="w-full outline-none" />
                    </div>
                    <div className="border p-2 rounded w-1/2">
                        <CardCvcElement className="w-full outline-none" />
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Card Holder Name"
                    className="p-2 border rounded w-full font-poppins"
                    required name='cardholderName'
                />

                <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm font-poppins">Save This Info For Future</span>
                </label>

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="bg-black text-white w-full py-2 rounded cursor-pointer font-poppins"
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;