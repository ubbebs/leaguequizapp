import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StateContext } from '../../App.js'
import { ACTIONS } from '../../utils/actions.js'
import { clearSplashMemory } from '../../utils/clearSplashMemory.js'
import { splashImagesExceptions } from '../../utils/splashimagesexceptions.js'
import { winScroll } from '../../utils/winScroll.js'
import SplashPick from './splashcomponents/splashpick.js'

import './splashpage.css'
import '../css/guessextended.css'
import '../css/pickextended.css'
import '../css/gradientextended.css'

export default function SplashPage() {
    const navigate = useNavigate()
    const stateContext = useContext(StateContext)

    useEffect(() => {
        //if splash champion isn't rolled => redirect to main page
        if (!stateContext.stateValue.rolledSplashChampion) return navigate('/')

        //if splash img is in local storage, but not in global state (refresh case) => data from local storage to global state
        if (localStorage.getItem('localRolledSplashImg') && !stateContext.stateValue.rolledSplashImg) {
            stateContext.stateDispatch({ type: ACTIONS.SET_ROLLED_SPLASH_IMG, payload: { rolledSplashImg: JSON.parse(localStorage.getItem('localRolledSplashImg')) }})
        }
        //if splash img isn't in local storage, and not in global state (direct link) => fetch data of rolled champion and set splash img
        else if (!localStorage.getItem('localRolledSplashImg') && !stateContext.stateValue.rolledSplashImg) {
            fetch(`https://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion/${stateContext.stateValue.rolledSplashChampion.id}.json`)
            .then(response => response.json())
            .then(data => stateContext.stateDispatch({ type: ACTIONS.SET_ROLLED_SPLASH_IMG, payload: { rolledSplashImg: data.data[stateContext.stateValue.rolledSplashChampion.id].skins[Math.floor(Math.random() * (data.data[stateContext.stateValue.rolledSplashChampion.id].skins.length - 1))] } }))
            .catch(console.error)
        }

        //if remaining champions names are in local storage but not in global state
        if (localStorage.getItem('localSplashChampionsNames') && !stateContext.stateValue.splashChampionsNames) {
            stateContext.stateDispatch({ type: ACTIONS.SET_SPLASH_CHAMPIONS_NAMES, payload: { splashChampionsNames : JSON.parse(localStorage.getItem('localSplashChampionsNames')) } })
        }
        //if remaining champions names aren't in local storage and not in global state
        else if (!localStorage.getItem('localSplashChampionsNames') && !stateContext.stateValue.splashChampionsNames) {
            stateContext.stateDispatch({ type: ACTIONS.SET_SPLASH_CHAMPIONS_NAMES, payload: { splashChampionsNames : Object.values(stateContext.stateValue.champions).map((elem, index) => elem.name) } })
        }

        //if picked champions names are in local storage but not in global state
        if (localStorage.getItem('localSplashPicked') && !stateContext.stateValue.splashPicked.length > 0) {
            stateContext.stateDispatch({ type: ACTIONS.SET_SPLASH_PICKED, payload: { splashPicked : JSON.parse(localStorage.getItem('localSplashPicked')) } })
        }
    }, [stateContext.stateValue.rolledSplashImg])

    //reroll if splash is in exception's list
    if (stateContext.stateValue.rolledSplashImg) {
        if (splashImagesExceptions.includes(stateContext.stateValue.rolledSplashImg.id)) {
            localStorage.removeItem('localRolledSplashImg')
            stateContext.stateDispatch({ type: ACTIONS.SET_ROLLED_SPLASH_IMG, payload: { rolledSplashImg : null }})
        }
    }

    //update local storage
    if (stateContext.stateValue.splashChampionsNames) localStorage.setItem('localSplashChampionsNames', JSON.stringify(stateContext.stateValue.splashChampionsNames))
    if (stateContext.stateValue.rolledSplashImg) {
        if (!splashImagesExceptions.includes(stateContext.stateValue.rolledSplashImg.id)) {
            localStorage.setItem('localRolledSplashImg', JSON.stringify(stateContext.stateValue.rolledSplashImg))
        }
    }

    //set splash image
    let splashImg = {}
    if (stateContext.stateValue.rolledSplashImg) {
        splashImg = {
            backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${stateContext.stateValue.rolledSplashChampion.id}_${stateContext.stateValue.rolledSplashImg.num}.jpg')`,
            backgroundSize: `${stateContext.stateValue.splashZoom}%`
        }
    }
    
    return (
        !stateContext.stateValue.rolledSplashChampion
            ? <p>Redirecting...</p>
            : (
                <div className='guess-main'>
                    <div className='guess-imgbox gradient-border-gold'>
                        <p>Which champion is on this splashart?</p>
                        <div className='sp-img gradient-border-blue' style={ splashImg } />
                    </div>
                    <SplashPick />
                    { stateContext.stateValue.splashCorrect && (
                        <>
                            <div className='pick-win gradient-border-gold' id='win'>
                                <p>Congrats!</p>
                                <img className='pick-win-avatar' src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${stateContext.stateValue.rolledSplashChampion.id}.png`} alt={`${stateContext.stateValue.rolledSplashChampion.name} avatar`} />
                                <p>{stateContext.stateValue.rolledSplashChampion.name} ({stateContext.stateValue.rolledSplashImg.name})</p>
                                <a href={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${stateContext.stateValue.rolledSplashChampion.id}_${stateContext.stateValue.rolledSplashImg.num}.jpg`} target={'_blank'} rel='noreferrer'>
                                    <img className='sp-win-splashart' src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${stateContext.stateValue.rolledSplashChampion.id}_${stateContext.stateValue.rolledSplashImg.num}.jpg`} alt={`${stateContext.stateValue.rolledSplashChampion.name} splashart`} />
                                </a>
                            </div>
                            <div className='gradient-button gradient-border-blue' onClick={() => clearSplashMemory(stateContext, ACTIONS)} tabIndex="0">
                                <p>Roll next!</p>
                            </div>
                        </>
                    )}
                    { stateContext.stateValue.splashCorrect && winScroll() }
                </div>
            )
    )
}
