const rollSplashChampion = (context, action) => {
    //rolling champion
    let rolled
    
    //if rolled champion in local storage set it to rolled
    if (localStorage.getItem('localRolledSplashChampion')) {
        rolled = context.stateValue.champions[localStorage.getItem('localRolledSplashChampion')]
    }
    //if rolled champion isn't in local storage, roll and set it to rolled
    else {
        const values = Object.values(context.stateValue.champions)
        rolled = values[Math.floor(Math.random() * values.length)]
        localStorage.setItem('localRolledSplashChampion', rolled.id)
    }
    context.stateDispatch({ type: action.SET_ROLLED_SPLASH_CHAMPION, payload: { rolledSplashChampion: rolled } })
}

export { rollSplashChampion }