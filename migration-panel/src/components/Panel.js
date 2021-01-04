import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from './Spinner';
import Row from './Row';
import Modal from './Modal'
import {Helmet} from 'react-helmet';
import migrate from '../utils/migrate';

const Panel = () => {
       const [loading, isLoading] = useState(true);
       const [products, setProducts] = useState([]);
       const [uploads, setUploads] = useState([]);
       const [change, setChange] = useState(0);
       const [modal, setModal] = useState(false);
       const [user, setUser] = useState({});
       const [progress, setProgress] = useState(0);
       const [done, setDone] = useState(false);

        //Watch progress
        useEffect(() => {
            if(progress === 100) {
                setDone(true);
            }
        }, [progress])

        

       //Hoist product Data to state 
       useEffect(() => { 
        const getData = async () => {
            try {
                let userData = await axios.get('/api/woo/panel/getUserData');
                setUser(userData.data); 
                let productData = await axios.get(`${userData.data.woo_url}/wp-json/wc/v3/products?consumer_key=${userData.data.api_client}&consumer_secret=${userData.data.api_secret}&per_page=100`)
               // let productData = await axios.get("https://woo.martinchammah.dev/wp-json/wc/v3/products?consumer_key=ck_d7490757f3c4b6433e64f0c5c1a6c351a2114459&consumer_secret=cs_724c493b3979d4da008454ce4cde57ac15060cf0&per_page=100")
                let createChecked = productData.data.map((product) => {
                    return {
                        ...product,
                        checked: false
                    }
                })
                setProducts(createChecked);
                isLoading(false);
            } catch (error) {
               console.log(error);
            }

        }
        getData();
       }, [])

       useEffect(() => {
           console.log("running effect")
            let willUpload = products.filter((item) => {
                return item.checked === true;
            })
            setUploads(willUpload);

            //was not detecting array changes
       }, [change])

        const selfSelect = (item, selected) => {
            for(let i = 0; i < products.length; i++) {
                if(products[i].id === item.id) {
                    let mutatedProducts = products;
                    mutatedProducts[i].checked = selected;
                    setProducts(mutatedProducts);
                    setChange(change + 1);
                }
            }
        }

        const selectAll = (selected) => {
            // let checkedProducts = 
            let theBool;
            selected ? theBool = true : theBool = false;
            let c = products.map((item) => {
                return {
                    ...item,
                    checked: theBool
                }
            })
            setProducts(c);
            setChange(change + 1);
        }

        const renderProducts = products.map((product) => {
                return(
                    <Row key={product.id} item={product} selfSelect={selfSelect} checked={product.checked}/>
                )
        })

        //MISSING BTM, FOR EACH PRODUCT CHECKED START MIGRATION
        
     

    if(loading) {
        return (
            <div className="spinner-container">
                <Spinner />
            </div>
        )
    } else {
        return(
        <div className="all-container">
            <Helmet>
                <html lang="es" />
                <title>Tus productos en woocommerce</title>
                <meta name="description" content="Migrar woocommerce a tiendanube" />
            </Helmet>
            <h1 className="title">Migración Woocommerce - Tiendanube</h1>
            <p className="subtitle">Seleccioná los productos que quieras migrar de woocommerce a tiendanube</p>
            <Row selectAll={selectAll}/>
            {renderProducts}
            {uploads.length ? <p className="center-text">{uploads.length} productos seleccionados</p> : <p className="center-text">Ningun producto seleccionado</p>}
           {uploads.length ? <button className="migration-btn" onClick={() => {
                migrate(uploads, user, progress, setProgress)
                setModal(!modal)
                }}>Comenzar Migración</button> : <button className="migration-btn disabled" >Comenzar Migración</button>}
            {modal ? <Modal progress={progress} setModal={setModal} done={done}/> : null}
        </div>
        )
  
    }
   
}

export default Panel
