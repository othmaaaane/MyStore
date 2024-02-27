import React from 'react'
import '../header/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons' 
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Link, Outlet } from 'react-router-dom'

function Header() {
    const myLinkedin=()=>{
        window.location='https://www.linkedin.com/in/othmane-l-05b293247/'
    }
    const myGithub=()=>{
        window.location='https://www.github.com/othmaaaane'
    }
  return (
    <>
    <nav>
        <div className='title-container'>
            <Link to={'/'}> <p className='title'>Othmane's Store</p></Link>
        </div>
        <div className='icon-container'>
        <Link to={`/Basket`}><FontAwesomeIcon id='panier-icon' icon={faCartShopping} /></Link>
            <FontAwesomeIcon id='linkedin-icon' icon={faLinkedin} onClick={myLinkedin}/>  
            <FontAwesomeIcon id='github-icon' icon={faGithub} onClick={myGithub}/>  
        </div>
        
    </nav>
    <Outlet/>
    </>
  )
}

export default Header