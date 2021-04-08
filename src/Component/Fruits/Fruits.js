import React from 'react';
import { Link, useHistory } from 'react-router-dom';



const Fruits = (props) => {

    const { name, img, _id, price } = props.fruits
    const history = useHistory();
    const hendleClick = (orders_Id) => {
        history.push(`/order/${orders_Id}`)
    }
    return (
        <div>
            <Link onClick={() => hendleClick(_id)}>
                <div className="col mb-5 ">
                    <div className="card h-80%">
                        <img style={{ width: '50%' }}
                            src={img} className="W-100% rounded mx-auto d-block mt-3" alt="dddd" />

                        <div className="card-body">
                            <h5 className="card-title text-secondary text-center">{name}</h5>
                            <h5 className="card-title text-secondary text-center">$ {price}</h5>
                            <p className="btn btn-success">Buy Now</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Fruits;