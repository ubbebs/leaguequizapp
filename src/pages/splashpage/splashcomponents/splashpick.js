import React, { useState, useContext, useEffect } from 'react'

import { StateContext } from '../../../App.js'
import { ACTIONS } from '../../../utils/actions.js'

import SearchResults from '../../../components/searchresults/searchresults.js'
import SearchAnswers from '../../../components/searchanswers/searchanswers.js'

import './splashpick.css'

export default function SplashPick() {
    const [search, setSearch] = useState()
    const [results, setResults] = useState()
    const stateContext = useContext(StateContext)

    useEffect(() => {
        if (search) {
            setResults(stateContext.stateValue.splashChampionsNames.filter((elem, index) => elem.startsWith(search.charAt(0).toUpperCase() + search.slice(1))))
        }
        if (search === '') {
            setResults(null)
        }
    }, [search, stateContext.stateValue.splashChampionsNames])

    useEffect(() => {
        if (stateContext.stateValue.splashPicked.length > 0) {
            localStorage.setItem('localSplashPicked', JSON.stringify(stateContext.stateValue.splashPicked))
        }

        if (stateContext.stateValue.splashPicked && stateContext.stateValue.splashPicked.slice(-1)[0] === stateContext.stateValue.rolledSplashChampion.name) {
            localStorage.setItem('localSplashCorrect', 'true')
            stateContext.stateDispatch({ type: ACTIONS.SET_SPLASH_CORRECT, payload: { splashCorrect : true } })
        } else if (stateContext.stateValue.splashPicked.length > 0) {
            stateContext.stateDispatch({ type: ACTIONS.SET_SPLASH_ZOOM, payload: { splashZoom: parseInt(stateContext.stateValue.splashZoom) * 0.98 > 100 ? parseInt(stateContext.stateValue.splashZoom) * 0.95 : 'cover' }})
            localStorage.setItem('localSplashChampionsNames', JSON.stringify(stateContext.stateValue.splashChampionsNames))
        }
    }, [stateContext.stateValue.splashPicked, stateContext.stateValue.splashCorrect])

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const handlePick = (e) => {
        stateContext.stateDispatch({ type: ACTIONS.SET_SPLASH_PICKED, payload: { splashPicked : [...stateContext.stateValue.splashPicked, e] } })
        stateContext.stateDispatch({ type: ACTIONS.SET_SPLASH_CHAMPIONS_NAMES, payload: { splashChampionsNames : stateContext.stateValue.splashChampionsNames.filter(elem => elem !== e) } })
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
            { !stateContext.stateValue.splashCorrect && <input className='gradient-border-blue' type='search' id='search' onChange={handleInput} autoComplete="off" /> }
            <div className='pick-answers'>
                {stateContext.stateValue.splashPicked && stateContext.stateValue.splashPicked.map((elem, index) => {
                    return (<SearchAnswers elem={elem} index={index} context={stateContext} deepcontext={stateContext.stateValue.rolledSplashChampion} correct={correctAnswer} wrong={wrongAnswer} />)
                })}
            </div>
        </div>
    )
}
