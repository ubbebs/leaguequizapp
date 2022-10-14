import { ACTIONS } from './actions.js'

const initialState = {
    champions: null,
    abilityChampionsNames: null,
    abilityPicked: [],
    abilityCorrect: false,
    splashChampionsNames: null,
    splashPicked: [],
    splashCorrect: false,
    splashZoom: 400,
    rolledAbilityChampion: null,
    rolledAbilityChampionDetails: null,
    rolledSplashChampion: null,
    rolledAbilityImg: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_CHAMPIONS:
            return {
                ...state,
                champions: action.payload.champions
            }
        case ACTIONS.SET_ABILITY_CHAMPIONS_NAMES:
            return {
                ...state,
                abilityChampionsNames: action.payload.abilityChampionsNames
            }
        case ACTIONS.SET_ABILITY_PICKED:
            return {
                ...state,
                abilityPicked: action.payload.abilityPicked
            }
        case ACTIONS.SET_ABILITY_CORRECT:
            return {
                ...state,
                abilityCorrect: action.payload.abilityCorrect
            }
        case ACTIONS.SET_SPLASH_CHAMPIONS_NAMES:
            return {
                ...state,
                splashChampionsNames: action.payload.splashChampionsNames
            }
        case ACTIONS.SET_SPLASH_PICKED:
            return {
                ...state,
                splashPicked: action.payload.splashPicked
            }
        case ACTIONS.SET_SPLASH_CORRECT:
            return {
                ...state,
                splashCorrect: action.payload.splashCorrect
            }
        case ACTIONS.SET_SPLASH_ZOOM:
            return {
                ...state,
                splashZoom: action.payload.splashZoom
            }
        case ACTIONS.SET_ROLLED_ABILITY_CHAMPION:
            return {
                ...state,
                rolledAbilityChampion: action.payload.rolledAbilityChampion
            }
        case ACTIONS.SET_ROLLED_ABILITY_IMG:
            return {
                ...state,
                rolledAbilityImg: action.payload.rolledAbilityImg
            }
        case ACTIONS.SET_ROLLED_SPLASH_CHAMPION:
            return {
                ...state,
                rolledSplashChampion: action.payload.rolledSplashChampion
            }
        case ACTIONS.SET_ROLLED_SPLASH_IMG:
            return {
                ...state,
                rolledSplashImg: action.payload.rolledSplashImg
            }
        case ACTIONS.INITIAL_ABILITY:
            return {
                ...state,
                abilityChampionsNames: null,
                abilityPicked: [],
                abilityCorrect: null,
                rolledAbilityChampion: null,
                rolledAbilityImg: null,
            }
        case ACTIONS.INITIAL_SPLASH:
            return {
                ...state,
                rolledSplashChampion: null,
                rolledSplashImg: null,
                splashChampionsNames: null,
                splashPicked: [],
                splashCorrect: null,
                splashZoom: 400,
            }
        default:
            return state
    }
}

export { initialState, reducer }