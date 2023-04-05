import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import BooksService from '../../services/BooksService';


function ErrorModal (props) {
    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
        </Modal>
    )
}

export default ErrorModal;