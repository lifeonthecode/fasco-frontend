const addressDeliveryCharge = async(shippingAddress) => {
    
    if(shippingAddress.toLowerCase() === 'new york' || shippingAddress.toLowerCase() === 'los angeles') {
        return 5; // Flat delivery charge for your specified cities or los angeles
    }
    return 60; // Flat delivery charge for other countries

};

export default addressDeliveryCharge;