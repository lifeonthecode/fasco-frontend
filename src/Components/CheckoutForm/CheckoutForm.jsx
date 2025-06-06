import { useState } from 'react';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js';

const cardTypes = [
    {
        name: 'Mastercard',
        value: 'mastercard',
        icon: 'https://img.icons8.com/color/48/mastercard-logo.png',
    },
    {
        name: 'Visa',
        value: 'visa',
        icon: 'https://img.icons8.com/color/48/visa.png',
    },
    {
        name: 'Amex',
        value: 'amex',
        icon: 'https://img.icons8.com/color/48/amex.png',
    },
    {
        name: 'Discover',
        value: 'discover',
        icon: 'https://img.icons8.com/color/48/discover.png',
    },
];





const CheckoutForm = ({ clientSecret}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
            },
        });

        if (error) {
            alert(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            alert('✅ Payment Successful!');
            // onPaymentSuccess(paymentIntent);
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-4 '
        >
            <h2 className="text-2xl font-bold font-poppins">Payment</h2>

            {/* Card Selection */}
            <div className="border p-3 rounded">
                <p className="mb-3 font-medium font-poppins">Cards</p>

                <div className="flex items-center justify-between gap-3">
                    {cardTypes.map((card) => (
                        <button
                            key={card.value}
                            type="button"
                            onClick={() => setSelectedCard(card.value)}
                            className={`p-2 border rounded transition cursor-pointer ${selectedCard === card.value ? 'border-blue-600 ring-2 ring-blue-400' : 'border-gray-300'
                                }`}
                        >
                            <img src={card.icon} alt={card.name} className="w-14 h-8" />
                        </button>
                    ))}
                </div>
            </div>

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
                    required
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