import { createContext,useState ,useEffect } from "react";
import { useHistory } from 'react-router'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

 let LoginContext = createContext({});

export function LoginContextProvider(props){
    let history= useHistory();
    const [loginUser, setloginUser] = useState({})
    // const [notes, setnotes] = useState([])
    
    const [currentNote, setcurrentNote] = useState(0)
    const [deleteEvent, setdeleteEvent] = useState(false)
    const [editEvent, seteditEvent] = useState(false)
    const [currentNoteContent, setcurrentNoteContent] = useState({})
      
    let decodedToken=(localStorage.getItem("currentUser") !=null)? localStorage.getItem("currentUser"): '' ; 
    let headers={token:decodedToken, userID:loginUser._id}

    function getUserInfo(){
        if (localStorage.getItem("currentUser") !=null){
          decodedToken=localStorage.getItem("currentUser");
          const userInfo= jwtDecode(decodedToken)
          setloginUser(userInfo)
          }
      }
 
    function logOutHandler(){
        setloginUser({})
        localStorage.clear();
        history.push('/login')
    }
 
    async function getNote(){
        let {data}= await axios(`https://route-egypt-api.herokuapp.com/getUserNotes`,{headers});  
        let notes= (data.Notes!==undefined)? data.Notes : [];  
        return notes
    }

    async function deleteHandler(){
        let info={"NoteID":currentNote,"token":decodedToken}
        let{data}=await axios.delete("https://route-egypt-api.herokuapp.com/deleteNote",{ data: info });  
        setdeleteEvent(false)
    }

    function confirmDelete(){
        setdeleteEvent(true)
    }

    async function editHandler(noteTitle,noteDesc){
        let info={"title":noteTitle,"desc":noteDesc,"NoteID":currentNote,"token":decodedToken}
        let {data}= await axios.put(`https://route-egypt-api.herokuapp.com/updateNote`, info );  
        seteditEvent(false);
    }

    function confirmEdit(){
        seteditEvent(true);       
    }
      
      return (
        <LoginContext.Provider value={{ getUserInfo : getUserInfo , token: decodedToken ,userName:loginUser.first_name, userID:loginUser._id , getNote:getNote , editHandler:editHandler ,setcurrentNote:setcurrentNote, deleteHandler:deleteHandler,seteditEvent:seteditEvent,setdeleteEvent:setdeleteEvent ,confirmDelete:confirmDelete,confirmEdit:confirmEdit,editEvent:editEvent,deleteEvent:deleteEvent,setcurrentNoteContent:setcurrentNoteContent ,currentNoteContent:currentNoteContent, logOut : logOutHandler}}>
            {props.children}
        </LoginContext.Provider>
    )

}

export default LoginContext;