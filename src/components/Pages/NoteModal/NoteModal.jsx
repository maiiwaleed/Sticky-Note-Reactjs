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



export default function NoteModal() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [noteTitle, setnoteTitle] = useState('')
  const [noteDesc, setnoteDesc] = useState('')

  let {userID,token}= useContext(LoginContext); //encodedToken
  // const [notePacket, setnotePacket] = useState({title:"",desc:"",userID:"",token:""})
  // let headers={token:token , userID:userID}

  async function handleSave(e){

     e.preventDefault()
     handleClose()
    //  setnotePacket({title:noteTitle,desc:noteDesc,userID:userID,token:token})
     let {data}= await axios.post(`https://route-egypt-api.herokuapp.com/addNote`,{title:noteTitle,desc:noteDesc,userID:userID,token:token});
     setnoteTitle('')
     setnoteDesc('')   
  }

  function noteHandler(e,callback){
    callback(e.target.value)
  }

  return (
    <>
      <Button className='ms-auto d-block'  variant="primary" onClick={handleShow}>
        Add Note
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header className='bg-dark ' closeButton>
          <Modal.Title className='bg-dark '>Add Note</Modal.Title>
        </Modal.Header>

        <Modal.Body className='bg-white text-dark'>
          <form onSubmit={handleSave}>
              <input type="text" onChange={(e)=>{noteHandler(e,setnoteTitle)}} value={noteTitle} className='form-control mb-3' placeholder='Title'/>

              <textarea type="text" onChange={(e)=>{noteHandler(e,setnoteDesc)}} value={noteDesc} className='form-control' rows='7'  placeholder='Note Description' />

              <div className='ms-auto w-50'>
                            <Button type='submit' variant="primary" className='me-2 mt-3' >
                              Add Note
                            </Button>
                            <Button onClick={handleClose}  variant="danger" className=' mt-3' >
                                Cancel
                            </Button>
                        </div>
          </form>
        </Modal.Body>

        {/* <Modal.Footer className='bg-white'>
          
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
         
        </Modal.Footer> */}

      </Modal>
    </>
  );
}
