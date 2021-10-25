import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import ParticlesBackground from '../../../ParticlesBackground'

export default function Register(props) {

    const [user, setuser] = useState({first_name:'',last_name:'',email:'',password:'',age:''})
    const [JoiError, setJoiError] = useState([])
    const [ApiError, setApiError] = useState('')

    async function submitHandler(e){
        e.preventDefault()
        //send user to API
        let {data}= await axios.post(`https://route-egypt-api.herokuapp.com/signup`,user)
        const joiVal = validateJoi()
       
        if(joiVal.error){
            setJoiError(joiVal.error.details)
            setApiError()
            // console.log(JoiError)
        }

        else{
            if(data.message==="success"){
                setJoiError([])
                props.history.push('/login')
            }
            else{
                setJoiError([])
                setApiError(data.message)
            }
        }

    }

    function getUser({target}){
        let newUser={...user};
        newUser[target.name]= target.value;
        setuser(newUser)
        // console.log(newUser)
    }
    
    function validateJoi(){
        const schema = Joi.object({
            first_name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
                last_name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
                email:  Joi.string()
                .email( {tlds: { allow: ['com', 'net'] }} ),
                password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) ,
                age: Joi.number()
                .integer()
                .min(16)
                .max(80),
            })

        return schema.validate(user,{abortEarly:false})
    }
   
    return (
        <>

        <ParticlesBackground />
        
        <div className='py-4 register'>
        <h2 className='mb-4'>Sign up Now</h2>

        {ApiError&& <div className='alert alert-danger mb-1 w-75 m-auto'> {ApiError}</div>}
        {JoiError&& JoiError.map((error,index)=><div key={index} className='alert alert-danger mb-1 w-75 m-auto'> {error.message}</div>)}
            <form onSubmit={submitHandler} className='w-75 m-auto'  >
                <label className='mb-2'>First Name:</label>
                <input onChange={getUser} value={user.first_name} className='form-control mb-2' type="text" name='first_name' />

                <label className="mb-2">last name:</label>
                <input onChange={getUser} value={user.last_name}  className="form-control mb-2" type="text" name="last_name"/>

                <label className="mb-2">email:</label>
                <input onChange={getUser} value={user.email}  className="form-control mb-2" type="email" name="email"/>

                <label className="mb-2">password:</label>
                <input onChange={getUser} value={user.password}  className="form-control mb-2" type="password" name="password"/>

                <label className="mb-2">age:</label>
                <input onChange={getUser} value={user.age} className="form-control " type="number" name="age"/>

                <button  className="btn btn-primary mt-3" type="submit">register</button>
            </form>
        </div>
        </>
    )
}
