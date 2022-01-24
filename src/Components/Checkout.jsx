import React from "react";
import './Checkout.css';
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";


function Checkout(){
    const [{ basket,user }, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_img" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
                <div className = "checkout_title">
                    <h3>Hy, {user?.email}</h3>
                    <br></br>
                    <h2>Your Shopping Basket</h2>
                    {basket.map(item => (
                        <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
            </div>


            <div className="checkout_right">
                {/* {subtotal component} */}
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;