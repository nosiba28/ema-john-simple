import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import Product from '../Product/Product';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    // console.log(products);
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id) =>{
        const remaining = cart.filter(product =>product.id !=id);
        setCart(remaining);
        removeFromDb(id);
    }
    
    const handleClearCart =()=>{
       setCart([]);
       deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className="review-container">
                {/* <h2>Orders page: {cart.length}</h2> */}
                {
                    cart.map(product => <ReviewItem
                    key={product.id}
                    product={product}
                    handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} 
                handleClearCart={handleClearCart}> 
                <Link className='btn-link' to='/checkout'><button className='btn-proceed'>Proceed Checkout</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;