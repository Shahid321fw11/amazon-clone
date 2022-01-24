import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotals } from './reducer';
import { useStateValue } from './StateProvider'

function Payment() {
    const [{basket,user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe  = useStripe();
    const element = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [clientSecret,setClientSecret] = useState(true);


    useEffect(() => {
        // generate the special stripe secret which allow us to charge a customer
        const getClientSecret = async () => {
            // const response = await axios
            const response = await axios({
                method: 'post',
                url:`/payments/create?total=${getBasketTotals(basket) * 100 }`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])

    const handleSubmit = async (e) => {
        // do all the facy stripe stuff....
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: element.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // payment intent = payment confirmation
            setSucceeded('true');
            setError(null);
            setProcessing(false);

            history.replace('/orders')
        })

    }

    const handleChange = e => {
        // Listen for changes in the cardElement
        // and display any errors as the custumer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.CheckoutProduct: "");

    }

    return (
    <div className="payment">
        <div className="payment_container">
            <h1>
                Checkout (<Link to = '/checkout'>{basket?.length}items</Link>)
            </h1>

            {/* payment sectio = delivery address */}
            <div className="payment_section">
                <div className="payment_title">
                    <h2>Delivery Address</h2>
                </div>
                <div className="payment_address">
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>


            {/* payment sectio = Item box */}

            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className="payment_items">
                    {basket.map(item => (
                        <CheckoutProduct
                        id = {item.id}
                        title={item.title}
                        image = {item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
            </div>



            {/* payment sectio = Payment method */}
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                    {/* stripe magic */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <div className="payment_priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <p>
                                            Subtotal ({basket.length} items): <strong>{value}</strong>
                                        </p>
                                        <small className="subtotal_gift">
                                            <input type="checkbox" /> This order contains a gift
                                        </small>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotals(basket)} 
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled = {processing || disabled || succeeded}>
                                <span> {processing ? <p>Processing</p>:"Buy Now"} </span>
                            </button>
                        </div>
                        {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>        
    </div>
  );
}

export default Payment;

