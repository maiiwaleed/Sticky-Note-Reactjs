import React, { useEffect ,useContext ,useState } from 'react'
import LoginContext from '../../../store/LoginContext'
import axios from 'axios';
import $ from 'jquery';
import DeleteModal from '../DeleteModal/DeleteModal'
import UpdateModal from '../UpdateModal/UpdateModal'

import NoteModal from '../NoteModal/NoteModal';



export default function Home() {

    let {getUserInfo,userName,token,userID, getNote,editHandler,deleteEvent,editEvent,confirmDelete,confirmEdit,setcurrentNote,setcurrentNoteContent}= useContext(LoginContext); //encodedToken
    let notes1=[];
    const [notes, setnotes] = useState([])
    
 
  useEffect( () => {
    getUserInfo()  
  }, [])

useEffect(async() => { 
    notes1= await getNote();
    setnotes(notes1)
})

$(".fa-ellipsis-v").on("click",function (){
    $(this).next().toggleClass('d-none')
    let test= $(this).data('key')
    setcurrentNote(test)
    
    // if(($(this).next().hasClass('d-none'))){
    //     $('*').not(this).on("click",function (){
    //         $(this).next().addClass('d-none')
    //     })
    // }
})
function removeMenu(){
    $(".optionsMenu").addClass('d-none')
}

$('.edit').on("click",function (){
    
    let noteContent = {"title":$(this).parents('.main').siblings('h4').text(),"desc":$(this).parents('.main').siblings('p').text()};
    setcurrentNoteContent( noteContent )
})

// console.log(deleteEvent)
    return (
        <div className=' my-3 container-fluid'>
            <h1 className=''>Hi {userName} </h1>
            <h2>here are your notes for today</h2>
            
                <NoteModal />
                
                {editEvent&& <UpdateModal />}
                {deleteEvent&& <DeleteModal />}
            <div className='row my-4'>
            { notes.map((note)=> (<div key={note._id} className='col-md-3 p-4 position-relative m-3  me-5 note bg-info'>
                   <div className='position-relative main '>
                        <i data-key={note._id}  className="fas fa-ellipsis-v position-absolute "></i>
                        <div  className="position-absolute optionsMenu bg-white py-3 rounded-1 d-none">
                            <ul className='list-unstyled '>
                                <li onClick={(e)=>{confirmEdit(); removeMenu(); }} className='d-flex justify-content-between mt-1 mb-2 p-1 edit'>
                                    <p className='text-dark me-4 mb-0 px-3'>Edit</p> 
                                    <i className="fas fa-edit text-primary pe-3"></i>
                                </li>
                                <li onClick={()=>{confirmDelete(); removeMenu()}} className='d-flex justify-content-between p-1 delete'>
                                    <p className='text-dark mb-0 me-4 px-3'>Delete</p> 
                                    <i className="fas fa-trash text-danger pe-3"></i>
                                </li>
                            </ul>
                        </div>
                   </div>
                    <h4 className='text-center text-dark mt-2 fw-bold text-capitalize text-wrap'>{note.title}</h4>
                    <p className='text-dark mt-1'>{note.desc}</p>
                    </div>) ) }        
            </div>
        </div>
    )
}
