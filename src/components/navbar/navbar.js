import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.css'

export default function NavBar() {
  return (
    <div className='navbar'>
        <Link to='/'>
            <h1>
                LeagueQuiz
            </h1>
        </Link>
    </div>
  )
}
