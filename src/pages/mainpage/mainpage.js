import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../../App.js'
import { ACTIONS } from '../../utils/actions.js'
import { rollAbilityChampion } from '../../utils/rollAbilityChampion.js'
import { rollSplashChampion } from '../../utils/rollSplashChampion.js'

import './mainpage.css'
import '../css/gradientextended.css'

export default function MainPage() {
    const stateContext = useContext(StateContext)
    
    return (
        <div className='mp-main'>
            <p>Hi! On <i>LeagueQuiz</i> you can test your knowledge about skins and abilities of all champions</p>
            <p>What are you waiting for?</p>
            <Link to='/splash'>
                <div className='gradient-button gradient-border-blue' onClick={() => rollSplashChampion(stateContext, ACTIONS)}>
                    <div className='gradient-button-box'>
                        <p>Splash Quiz!</p>
                        <p>Guess from a splashart</p>
                    </div>
                </div>
            </Link>
            <Link to='/ability'>
                <div className='gradient-button gradient-border-blue' onClick={() => rollAbilityChampion(stateContext, ACTIONS)}>
                    <div className='gradient-button-box'>
                        <p>Ability Quiz!</p>
                        <p>Guess from an ability</p>
                    </div>
                </div>
            </Link>
        </div>
    ) 
}
