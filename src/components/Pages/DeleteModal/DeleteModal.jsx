import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router';

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import LoginContext from '../../../store/LoginContext';


export default function NoteModal(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let {deleteHandler,deleteEvent}= useContext(LoginContext); 

  async function handleDelete(e){
     e.preventDefault()
     deleteHandler()
    
    setShow(false)
     handleClose()  
  }

  useEffect(() => {
      if(deleteEvent){
          setShow(true)
        }
  },[deleteEvent])

  
  return (
    <>
        <Modal show={show} onHide={handleClose}>

                    <Modal.Header className='bg-dark ' closeButton>
                    <Modal.Title className='bg-dark '>Delete Note</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className='bg-white text-dark'>
                    <form onSubmit={handleDelete}>
                        <p className='text-dark'>Do you really want to delete ? <br /> process cannot be undone </p>
                        
                        <div className='ms-auto w-50'>
                            <Button type='submit' variant="danger" className='me-2 mt-3' >
                                Delete Note
                            </Button>
                            <Button onClick={handleClose}  variant="dark" className=' mt-3' >
                                Cancel
                            </Button>
                        </div>
                    </form>
                    </Modal.Body>


                </Modal>

      
    </>
  );
}
