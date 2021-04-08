import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const axios = require('axios').default;
//import fakeData from '../../fakeData/fakeData.json'
const Inventory = () => {
    // console.log(fakeData);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [imageURL, setImageUrl] = useState(null)

    const onSubmit = (data) => {
        const eventData = {
            id: data.id,
            name: data.name,
            img: imageURL,
            price: data.price,
            quantaty: data.quantaty,

        };

        console.log(eventData)
        const url = `http://localhost:5000/addEvent`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => console.log('server site responsd', res))
    };


    const hendelImageUplode = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '98013b1c222fff498e57c225e04b3b5b');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p><span>Id</span><input name='id' defaultValue="id" {...register("id")} /></p>
                <p><span>Name</span><input name='name' defaultValue="name" {...register("name")} /></p>
                <p><span>Price:</span><input name='price' defaultValue="Price" {...register("price")} /></p>
                <p><span>Quantaty:</span><input name='quantaty' defaultValue="Quantaty" {...register("quantaty")} /></p>
                <p><span>Product Image</span><input type="file" onChange={hendelImageUplode} /></p>
                <input type="submit" />

            </form>
        </div >
    );
};

export default Inventory;