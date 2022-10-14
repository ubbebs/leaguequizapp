import React, { useState, useContext, useEffect } from 'react'

import { StateContext } from '../../../App.js'
import { ACTIONS } from '../../../utils/actions.js'

import SearchResults from '../../../components/searchresults/searchresults.js'
import SearchAnswers from '../../../components/searchanswers/searchanswers.js'

import './abilitypick.css'

export default function AbilityPick() {
    const [search, setSearch] = useState()
    const [results, setResults] = useState()
    const stateContext = useContext(StateContext)

    useEffect(() => {
        if (search) {
            setResults(stateContext.stateValue.abilityChampionsNames.filter((elem, index) => elem.startsWith(search.charAt(0).toUpperCase() + search.slice(1))))
        }
        if (search === '') {
            setResults(null)
        }
    }, [search])

    useEffect(() => {
        if (stateContext.stateValue.abilityPicked.length > 0) {
            localStorage.setItem('localAbilityPicked', JSON.stringify(stateContext.stateValue.abilityPicked))
        }

        if (stateContext.stateValue.abilityPicked && stateContext.stateValue.abilityPicked.slice(-1)[0] === stateContext.stateValue.rolledAbilityChampion.name) {
            localStorage.setItem('localSplashCorrect', 'true')
            stateContext.stateDispatch({ type: ACTIONS.SET_ABILITY_CORRECT, payload: { abilityCorrect : true } })
        } else if (stateContext.stateValue.abilityPicked.length > 0) {
            localStorage.setItem('localAbilityChampionsNames', JSON.stringify(stateContext.stateValue.abilityChampionsNames))
        }
    }, [stateContext.stateValue.abilityPicked, stateContext.stateValue.abilityCorrect])

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const handlePick = (e) => {
        stateContext.stateDispatch({ type: ACTIONS.SET_ABILITY_PICKED, payload: { abilityPicked : [...stateContext.stateValue.abilityPicked, e] } })
        stateContext.stateDispatch({ type: ACTIONS.SET_ABILITY_CHAMPIONS_NAMES, payload: { abilityChampionsNames : stateContext.stateValue.abilityChampionsNames.filter(elem => elem !== e) } })
        document.querySelector('#search').value = ''
        setSearch('')
        setResults('')
    }

    let correctAnswer = {
        borderImageSource: 'linear-gradient(#06b817, #017312)'
    }

    let wrongAnswer = {
        borderImageSource: 'linear-gradient(#0593a7, #016b8b)'
    }

    return (
        <div className='pick-main'>
            { results &&
                <div className='pick-answers pick-results'>
                    {results && results.map((elem, index) => {
                        return (<SearchResults elem={elem} index={index} handlePick={handlePick} context={stateContext} />)
                    })}
                </div>
            }
            { !stateContext.stateValue.abilityCorrect && <input className='gradient-border-blue' type='search' id='search' onChange={handleInput}  autoComplete="off" />}
            <div className='pick-answers'>
                {stateContext.stateValue.abilityPicked && stateContext.stateValue.abilityPicked.map((elem, index) => {
                    return (<SearchAnswers elem={elem} index={index} context={stateContext} deepcontext={stateContext.stateValue.rolledAbilityChampion} correct={correctAnswer} wrong={wrongAnswer} />)
                })}
            </div>
        </div>
    )
}
