import React, { useEffect, useState } from 'react';


const EditProduct = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/item-orders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, []);

    const deleteProduct = (event, _id) => {
        fetch(`http://localhost:5000/delete/${_id}`, {
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
                    orders.map(order => <ol className="text-center"> coustomar: Product: {order.name}, Price: {order.price}, Quantity: {order.quantity}kg. <button class="btn btn-danger" onClick={() => deleteProduct(`event,${order._id}`)}>Delete</button> </ol>)
                }


            </div>
        </div>
    );
};


export default EditProduct;