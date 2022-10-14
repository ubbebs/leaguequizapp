import React, { useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'

import { initialState, reducer } from './utils/reducer.js'
import { ACTIONS } from './utils/actions.js'

import NavBar from './components/navbar/navbar.js'
import MainPage from './pages/mainpage/mainpage.js'
import SplashPage from './pages/splashpage/splashpage.js'
import AbilityPage from './pages/abilitypage/abilitypage.js'
import Footer from './components/footer/footer.js'

export const StateContext = React.createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch('http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json')
    .then(response => response.json())
    .then(data => dispatch({ type: ACTIONS.SET_CHAMPIONS, payload: { champions: data.data } }))
    .catch(console.error)
  }, [])

  if (state.champions) localStorage.setItem('localChampions', JSON.stringify(state.champions))

  return (
    <StateContext.Provider value={{stateValue: state, stateDispatch: dispatch}}>
      <NavBar />
      <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/splash' element={<SplashPage />} />
          <Route path='/ability' element={<AbilityPage />} />
      </Routes>
      <Footer />
    </StateContext.Provider>
  );
}

export default App;
