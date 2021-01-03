import React from 'react'
import axios from 'axios'


const Panel = () => {

    const getData = () => {
        axios.get('/api/woo/panel/getUserData').then(x => console.log(x));
    }

    return (
        <div>
            <button onClick={getData}>Get Data</button>
            Panel
        </div>
    )
}

export default Panel
