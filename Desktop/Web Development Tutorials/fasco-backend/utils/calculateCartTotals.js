
const calculateCartTotals = async(cart) =>{

    // console.log('calculateCartTotals: ', cart)

    let subtotal = 0;
    let totalDiscount = 0;
    let totalPrice = 0;
    let totalItems = 0;
    let discount = 0;
    cart.products.forEach(item => {
        const price = item.product.originalPrice;
        discount = item.product.discount;
        const quantity = item.quantity;

        subtotal += price * quantity;
        totalDiscount += (subtotal * discount) / 100;
        totalPrice += subtotal - totalDiscount; 
        totalItems += quantity
    });

    return {
        subtotal,
        totalDiscount,
        totalItems,
        totalPrice,
        discount
    }

};

export default calculateCartTotals;