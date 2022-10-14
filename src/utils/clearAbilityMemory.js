import { rollAbilityChampion } from "./rollAbilityChampion"

//clearing local storage and global state
const clearAbilityMemory = (context, action) => {
    localStorage.removeItem('localAbilityCorrect')
    localStorage.removeItem('localAbilityChampionsNames')
    localStorage.removeItem('localAbilityPicked')
    localStorage.removeItem('localRolledAbilityImg')
    localStorage.removeItem('localRolledAbilityChampion')
    context.stateDispatch({ type: action.INITIAL_ABILITY })
    rollAbilityChampion(context, action)
}

export { clearAbilityMemory }