import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const OrderReview = () => {
    //const UserContext = createContext

    const [loggedInUser, setloggedInUser] = useContext(UserContext)
    console.log(loggedInUser)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('https://stormy-gorge-59612.herokuapp.com/item-orders?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])
    return (
        <div>
            <div className="container">
                <h1 className="text-center">Your Order Item {orders.length}</h1>

                {
                    orders.map(order => <ol className="text-center"> coustomar: {loggedInUser.email} Product: {order.name}, Price: {order.price}, Quantity: {order.quantity}kg </ol>)
                }


            </div>
        </div>
    );
};

export default OrderReview;