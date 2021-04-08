
import React, { useEffect, useState } from 'react';
import Fruits from '../Component/Fruits/Fruits';
//import fakeData from '../fakeData/fakeData.json'





const Home = () => {

    const [fruits, setFruit] = useState([]);
    useEffect(() => {
        // setFruit(fakeData);
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setFruit(data))
    }, [])
    return (
        <div>
            <div style={{ paddingBottom: "200px" }} className="bg-dark">
                <div className="container pt-5">
                    <div className='row row-cols-1 row-cols-md-4 g-4 box'>
                        {fruits.map(fruits => <Fruits fruits={fruits}></Fruits>)}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;