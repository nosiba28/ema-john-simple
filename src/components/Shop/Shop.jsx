import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);
    
    useEffect(()=>{
    const storedCart = getShoppingCart();
    const savedCart =[];
    // console.log(storedCart);
    // step 1: get id
      for(const id in storedCart){
        // step2: get the product by using id
        const addProduct = products.find(product => product.id ===id);
        // step 3: const quantity of the product /add quantity
        if(addProduct){
            const quantity  = storedCart[id];
        addProduct.quantity = quantity;
        // step4: add the added product to the saved cart
        savedCart.push(addProduct);
        }
      }
      //step 5: set the cart
      setCart(savedCart);
    }, [products])

    const handleAddToCart = (product)=>{
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }
    const handleClearCart =()=>{
        setCart([]);
        deleteShoppingCart();
     }
    return (
        <div className='shop-container'>
            <div className="products-containers">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}
                handleClearCart={handleClearCart}>
                    <Link className='btn-link' to="/orders"><button className='btn-proceed'>Review Order</button></Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;