import React, { useEffect, useState } from 'react';


const EditProduct = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('https://stormy-gorge-59612.herokuapp.com/item-orders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, []);

    const deleteProduct = (event, _id) => {
        fetch(`https://stormy-gorge-59612.herokuapp.com/delete/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    event.target.parentNode.style.display = 'none';
                }
                // console.log('data delete successfully')
            })
    }
    return (
        <div>
            <div className="container">
                <h1 className="text-center">Your Order Item {orders.length}</h1>

                {
                    orders.map(order => <ol className="text-center">  Product: {order.name}, Price: {order.price}, Quantity: {order.quantity}kg. <button class="btn btn-danger" onClick={() => deleteProduct(`event,${order._id}`)}>Delete</button> </ol>)
                }


            </div>
        </div>
    );
};


export default EditProduct;