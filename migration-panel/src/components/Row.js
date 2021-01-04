import React, {useState, useEffect} from 'react'
import './styles/row.css';
const Row = (props) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked])

    if(props.item) {
        let {id, permalink, name, type, price, categories, images} = props.item;
        return (
            <div className="row">
                <input type="checkbox" checked={checked} onChange={
                    (e) => {
                        props.selfSelect(props.item, e.target.checked)
                        setChecked(!checked);
                    }}/>
                <div>{id}</div>
                <div><a className="woo-link" href={permalink} target="__blank">{name}</a></div>
                <div>{type}</div>
                <div>{price}</div>
                <div>{categories[0]?.name}</div>
                <div>{images?.length || 0}</div>
            </div>
        )
    } else {
        return(
        <div className="row">
            <input type="checkbox" onChange={e => props.selectAll(e.target.checked)} />
            <div>Woo ID</div>
            <div>Nombre</div>
            <div>Tipo</div>
            <div>Precio</div>
            <div>Categorias</div>
            <div>Imágenes</div>
        </div>
        )
    }
 
}

export default Row
