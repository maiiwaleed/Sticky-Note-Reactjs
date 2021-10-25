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

  
  let {editHandler,editEvent,currentNoteContent}= useContext(LoginContext); 

  const [noteTitle, setnoteTitle] = useState(currentNoteContent.title)
  const [noteDesc, setnoteDesc] = useState(currentNoteContent.desc)

  async function handleDelete(e){
     e.preventDefault()
    editHandler(noteTitle,noteDesc)
    setShow(false)
     handleClose()  
  }

  useEffect(() => {
    if(editEvent){
        setShow(true)
      }
  },[editEvent])

  function noteHandler(e,callback){
    callback(e.target.value)
   }
  
  return (
    <>
        <Modal show={show} onHide={handleClose}>

                    <Modal.Header className='bg-dark ' closeButton>
                    <Modal.Title className='bg-dark '>Update Note</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className='bg-white text-dark'>
                    <form onSubmit={handleDelete}>

                        <input type="text" onChange={(e)=>{noteHandler(e,setnoteTitle)}} value={noteTitle}  className='form-control mb-2' placeholder='Title'/>

                        <textarea type="text" onChange={(e)=>{noteHandler(e,setnoteDesc)}} value={noteDesc} className='form-control' rows='7'  placeholder='Note Description' />

                        <div className='ms-auto w-50'>
                            <Button type='submit' variant="warning" className='me-2 mt-3' >
                                Update Note
                            </Button>
                            <Button onClick={handleClose}  variant="danger" className=' mt-3' >
                                Cancel
                            </Button>
                        </div>
                    </form>
                    </Modal.Body>


                </Modal>

      
    </>
  );
}
