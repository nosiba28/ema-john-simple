import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();
    // console.log(products);
    // id cart data is in database, you have to use async await

    const storedCart = getShoppingCart();

    // console.log(storedCart);
    // object er upor for in chalabo
     const savedCart = [];
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id ===id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    // If you need to send two things
    //  return [products, savedCart]
    //  another options
    // return {products, cart: savedCart}

    return savedCart;
}
export default cartProductsLoader;