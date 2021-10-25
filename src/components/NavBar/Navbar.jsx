import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom';
import LoginContext from '../../store/LoginContext';


export default function Navbar() {

      let {token,logOut} = useContext(LoginContext);
      
    return (
        <>
            <nav className="p-3 m-0   bg-dark d-flex align-items-center justify-content-between">

                <div className="logo d-flex  bg-dark align-items-center ms-5">
                    <i className="far fa-sticky-note fa-lg me-2 bg-dark" aria-hidden="true"></i>
                    <p className='fs-4 m-0 bg-dark'>Notes</p>
                </div>

                <ul className="d-flex list-unstyled bg-dark align-items-center me-5">
                    
                    {(token) ? <li  className='bg-dark'>
                        <a onClick={logOut} className="text-decoration-none mx-4">sign out</a>
                    </li>:<>
                        <li className='bg-dark'>
                            <NavLink className='mx-4 ' activeClassName='activeLink' to='/register'>Sign up</NavLink>
                        </li>
                        <li  className='bg-dark'>
                            <NavLink className='mx-4'  activeClassName='activeLink' to='/login'>Sign in</NavLink>
                        </li>
                    </>  }
                   

                </ul>
            </nav>
        </>
    )
}
