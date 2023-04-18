import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({cart, handleClearCart, children}) => {
    // const cart = props.cart; //option 1
    // const {cart} = props; //option 2
    console.log(cart);
    let totalPrice =0;
    let totalShipping =0;
    let quantity =0;
    for(const product of cart){
        product.quantity = product.quantity || 1;
        totalPrice += product.price *product.quantity;
        totalShipping += product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice*7/100;
    const grandTotal = totalPrice + totalShipping +tax;
    return (
        <div className='cart'>
           <h2>Order Summary</h2>
                <p>Selected Items: {quantity}</p> 
                <p>Total Price: ${totalPrice}</p>
                <p>Shipping: ${totalShipping}</p>
                <p>Tax:${tax.toFixed(2)}</p>
                <p>Grand Total: ${grandTotal.toFixed(2)}</p>
                <button onClick={handleClearCart} className='btn-clear-cart'><span>Clear Cart </span><FontAwesomeIcon icon={faTrashAlt} /></button>
                {children}
        </div>

    );
};

export default Cart;