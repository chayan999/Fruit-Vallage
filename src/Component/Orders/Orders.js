import React, { useEffect, useState } from 'react';
//import fakeData from '../../fakeData/fakeData.json'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Orders = () => {

    const { orders_Id } = useParams()
    const [product, setProduct] = useState([])
    console.log(product);
    console.log(orders_Id)
    useEffect(() => {
        fetch('https://stormy-gorge-59612.herokuapp.com/product')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [orders_Id])
    const userId = product.find(ids => ids._id == orders_Id)
    console.log(userId);

    return (
        <div>
            <h2>Checkout</h2>
            <div className="container">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>{userId?.name}</td>
                            <td>{userId?.quantity}</td>
                            <td>$ {userId?.price}</td>

                        </tr>
                    </tbody>
                </table>
                <Link to="/order-review" className="btn btn-success">
                    Checkout
                </Link>
            </div>
        </div>
    );
};

export default Orders;

