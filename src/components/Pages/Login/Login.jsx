import axios from 'axios'
import Joi from 'joi'
import React, { useState ,useContext ,useEffect} from 'react'
import ParticlesBackground from '../../../ParticlesBackground';
import LoginContext from '../../../store/LoginContext';


export default function Login(props) {
    const [user, setuser] = useState({email:'',password:''})
    const [error, seterror] = useState() //initially false
    const [errorList, seterrorList] = useState([]) 
    const [loading, setLoading] = useState() //initially false
     
    let {token}=useContext(LoginContext)

    
    async function submitHandler(e){
        e.preventDefault()
        setLoading(true)  
        //send user to API
        let {data}= await axios.post(`https://route-egypt-api.herokuapp.com/signin`,user)
        const joiVal = validateJoi()
       
         if(joiVal.error){ //joi val has error
            seterrorList(joiVal.error.details)           
            setLoading(false) 
         }
         else{//joi val passed so we check api error
            seterrorList([])           
            // seterror(false)
              if(data.message==="success"){
                  localStorage.setItem("currentUser",data.token)
                    seterror(false)
                    props.history.push('/home')   
             }
             else{
                seterror((data.message))
                setLoading(false) 
             }
         }

    }

    function getUser(e){
        let userInfo= {...user};
        userInfo[e.target.name]= e.target.value;
        setuser(userInfo)
        //console.log(userData)
    }
    
    function validateJoi(){
        const schema = Joi.object({       
                email:  Joi.string()
                .email( {tlds: { allow: ['com', 'net'] }} ),
                password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) ,       
            })

        return schema.validate(user,{abortEarly:false})
       }

    return (
        <>
            <ParticlesBackground/>
        <div className='py-4 login'>
            <h2 className='mb-4'>Login Now</h2>

            {error && <div className='alert alert-danger w-75 m-auto '>{error}</div>}
            {errorList.map((error,index)=> <div key={index} className='alert alert-danger w-75 m-auto mb-1'>{error.message}</div>)}

            <form onSubmit={submitHandler} className='w-75 m-auto'>

                <label className="mb-2">email:</label>
                <input onChange={getUser} value={user.email} className="form-control mb-2" type="email" name="email"/>

                <label className="mb-2">password:</label>
                <input onChange={getUser} value={user.password} className="form-control mb-2" type="password" name="password"/>

                <button className="btn btn-primary" type="submit">{loading? <i className="fas fa-spinner fa-spin bg-transparent"></i> : 'Login'}</button>
            </form>
       </div>
        </>
    )
}
