import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StateContext } from '../../App.js'
import { ACTIONS } from '../../utils/actions.js'
import { clearAbilityMemory } from '../../utils/clearAbilityMemory.js'
import { winScroll } from '../../utils/winScroll.js'
import AbilityPick from './abilitycomponents/abilitypick.js'

import './abilitypage.css'
import '../css/guessextended.css'
import '../css/pickextended.css'
import '../css/gradientextended.css'

export default function AbilityPage() {
    const navigate = useNavigate()
    const stateContext = useContext(StateContext)

    useEffect(() => {
        //if ability champion isn't rolled => redirect to main page
        if (!stateContext.stateValue.rolledAbilityChampion) return navigate('/')

        //if ability champion's data is in local storage, but not in global state (refresh case) => data from local storage to global state
        if (localStorage.getItem('localRolledAbilityImg') && !stateContext.stateValue.rolledAbilityImg) {
            stateContext.stateDispatch({ type: ACTIONS.SET_ROLLED_ABILITY_IMG, payload: { rolledAbilityImg: JSON.parse(localStorage.getItem('localRolledAbilityImg')) }})
        } 
        //if splash img isn't in local storage, and not in global state (direct link) => fetch data of rolled champion and set splash img
        else if (!localStorage.getItem('localRolledAbilityImg') && !stateContext.stateValue.rolledAbilityImg) {
            fetch(`http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion/${stateContext.stateValue.rolledAbilityChampion.id}.json`)
            .then(response => response.json())
            .then(data => stateContext.stateDispatch({ type: ACTIONS.SET_ROLLED_ABILITY_IMG, payload: { rolledAbilityImg: data.data[stateContext.stateValue.rolledAbilityChampion.id].spells[Math.floor(Math.random() * data.data[stateContext.stateValue.rolledAbilityChampion.id].spells.length)] } }))
            .catch(console.error)
        }

        //if remaining champions names are in local storage but not in global state
        if (localStorage.getItem('localAbilityChampionsNames') && !stateContext.stateValue.abilityChampionsNames) {
            stateContext.stateDispatch({ type: ACTIONS.SET_ABILITY_CHAMPIONS_NAMES, payload: { abilityChampionsNames : JSON.parse(localStorage.getItem('localAbilityChampionsNames')) } })
        }
        //if remaining champions names aren't in local storage and not in global state
        else if (!localStorage.getItem('localAbilityChampionsNames') && !stateContext.stateValue.abilityChampionsNames) {
            stateContext.stateDispatch({ type: ACTIONS.SET_ABILITY_CHAMPIONS_NAMES, payload: { abilityChampionsNames : Object.values(stateContext.stateValue.champions).map((elem, index) => elem.name) } })
        }

        //if picked champions names are in local storage but not in global state
        if (localStorage.getItem('localAbilityPicked') && !stateContext.stateValue.splashPicked.length > 0) {
            stateContext.stateDispatch({ type: ACTIONS.SET_ABILITY_PICKED, payload: { abilityPicked : JSON.parse(localStorage.getItem('localAbilityPicked')) } })
        }
    }, [stateContext.stateValue.rolledAbilityImg])

    //update local storage
    if (stateContext.stateValue.abilityChampionsNames) localStorage.setItem('localAbilityChampionsNames', JSON.stringify(stateContext.stateValue.abilityChampionsNames))
    if (stateContext.stateValue.rolledAbilityImg) localStorage.setItem('localRolledAbilityImg', JSON.stringify(stateContext.stateValue.rolledAbilityImg))

    //set splash image
    let splashImg = {}
    if (stateContext.stateValue.rolledAbilityImg) {
        splashImg = {
            backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/12.19.1/img/spell/${stateContext.stateValue.rolledAbilityImg.image.full}')`,
        }
    }
    
    return (
        !stateContext.stateValue.rolledAbilityChampion
            ? <p>Redirecting...</p>
            : (
                <div className='guess-main'>
                    <div className='guess-imgbox gradient-border-gold'>
                        <p>Which champion has this ability?</p>
                        <div className='ap-img gradient-border-blue' style={ splashImg } />
                    </div>
                    <AbilityPick />
                    { stateContext.stateValue.abilityCorrect && (
                        <>
                            <div className='pick-win gradient-border-gold' id='win'>
                                <p>Congrats!</p>
                                <img className='pick-win-avatar' src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${stateContext.stateValue.rolledAbilityChampion.id}.png`} alt={`${stateContext.stateValue.rolledAbilityChampion.name} avatar`} />
                                <div className='ap-desc'>
                                    <div className='ap-desc-img' style={ splashImg } />
                                    <p className='ap-desc-text' dangerouslySetInnerHTML={{ __html: stateContext.stateValue.rolledAbilityImg.description }} />
                                </div>
                            </div>
                            <div className='gradient-button gradient-border-blue' onClick={() => clearAbilityMemory(stateContext, ACTIONS)} tabIndex="0">
                                <p>Roll next!</p>
                            </div>
                        </>
                    )}
                    { stateContext.stateValue.abilityCorrect && winScroll() }
                </div>
            )
    )
}
