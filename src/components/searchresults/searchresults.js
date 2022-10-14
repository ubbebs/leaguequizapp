import React from 'react'

export default function SearchResults(props) {
    return (
        <div className='pick-answerbox gradient-border-blue' onClick={() => props.handlePick(props.elem)}>
            <div className='pick-answerbox-img pick-resultbox-img' style={{backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${Object.values(props.context.stateValue.champions).filter((value, index) => value.name === props.elem)[0].id}.png')`}}></div>
            <p key={props.index}>{props.elem}</p>
        </div>
    )
}
