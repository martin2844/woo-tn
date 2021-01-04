import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Spinner from './Spinner';
const Modal = (props) =>{
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Estado de Migración</h2>
                <div className="progress-container"><ProgressBar bgcolor="#2f53f5" completed={props.progress} /></div>
                {props.done ? <h3>Migración completa</h3> : <p>Por favor no refresques ni cierres la ventana</p>}
                {props.done ? <button className="migration-btn" onClick={() => props.setModal(false)}>Cerrar</button> : <Spinner/>}
            </div>
        </div>
    )
} 

export default Modal