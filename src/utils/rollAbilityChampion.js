const rollAbilityChampion = (context, action) => {
    //rolling champion
    let rolled
    
    //if rolled champion in local storage set it to rolled
    if (localStorage.getItem('localRolledAbilityChampion')) {
        rolled = context.stateValue.champions[localStorage.getItem('localRolledAbilityChampion')]
    }
    //if rolled champion isn't in local storage, roll and set it to rolled
    else {
        const values = Object.values(context.stateValue.champions)
        rolled = values[Math.floor(Math.random() * values.length)]
        localStorage.setItem('localRolledAbilityChampion', rolled.id)
    }
    context.stateDispatch({ type: action.SET_ROLLED_ABILITY_CHAMPION, payload: { rolledAbilityChampion: rolled } })
}

export { rollAbilityChampion }