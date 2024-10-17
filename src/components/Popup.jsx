import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Popup({show,onClose,onShow}){
    

    return(
        <>
     <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pedido de envio publicado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se ha notificado y enviado mail a todos los transportistas dentro de la zona de cobertura. </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>
            Entendido!
          </Button>
        </Modal.Footer>
      </Modal>
    </> )
}