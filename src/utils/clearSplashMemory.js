import { rollSplashChampion } from "./rollSplashChampion"

//clearing local storage and global state
const clearSplashMemory = (context, action) => {
        localStorage.removeItem('localSplashCorrect')
        localStorage.removeItem('localSplashChampionsNames')
        localStorage.removeItem('localSplashPicked')
        localStorage.removeItem('localRolledSplashChampion')
        localStorage.removeItem('localRolledSplashImg')
        context.stateDispatch({ type: action.INITIAL_SPLASH })
        rollSplashChampion(context, action)
}

export { clearSplashMemory }