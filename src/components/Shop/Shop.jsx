import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';
import { faDungeon } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { totalProducts } = useLoaderData();

    const options = [5, 10, 20];
    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }


    // const itemsPerPage = 10;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // const pageNumbers = [];
    // for(let i=1; i<= totalPages; i++){
    //     pageNumbers.push(i);
    // }
    // Alternative::

    const pageNumbers = [...Array(totalPages).keys()];

    console.log(totalProducts);
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data));
    // }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await response.json();
            setProducts(data);
        }
        fetchData()
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                const savedCart = [];
                // console.log(storedCart);
                // step 1: get id
                for (const id in storedCart) {
                    // step2: get the product by using id
                    const addProduct = cartProducts.find(product => product._id === id);
                    // step 3: const quantity of the product /add quantity
                    if (addProduct) {
                        const quantity = storedCart[id];
                        addProduct.quantity = quantity;
                        // step4: add the added product to the saved cart
                        savedCart.push(addProduct);
                    }
                }
                //step 5: set the cart
                setCart(savedCart);
            })
    }, [])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product._id)
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <>
            <div className='shop-container'>
                <div className="products-containers">
                    {
                        products.map(product => <Product key={product._id} product={product} handleAddToCart={handleAddToCart}></Product>)
                    }

                </div>
                <div className="cart-container">
                    <Cart cart={cart}
                        handleClearCart={handleClearCart}>
                        <Link className='btn-link' to="/orders"><button className='btn-proceed'>Review Order</button></Link>
                    </Cart>
                </div>

            </div>
            {/* Pagination */}
            <div className="pagination">
                <p>Current Page: {currentPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>)
                    }

                </select>
            </div>
        </>
    );
};

export default Shop;