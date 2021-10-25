import { createContext } from "react";
import { useState } from "react/cjs/react.development";


 let NotesContext = createContext({});

export function NotesContextProvider(props){
 
    const [notes, setnotes] = useState([])


    function getNoteInfo(){
        if (localStorage.getItem('userNotes')!=null){
            setnotes(JSON.parse(localStorage.getItem('userNotes')))
        }
      }
      
    function logOutHandler(){
        setnotes([])
        localStorage.clear();
        
    }
    return (
        <NotesContext.Provider value={{ getNoteInfo : getNoteInfo, val:notes ,logOut : logOutHandler}}>
            {props.children}
        </NotesContext.Provider>
    )

}

export default NotesContext;