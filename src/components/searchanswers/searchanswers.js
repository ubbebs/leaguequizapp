import React from 'react'

export default function SearchAnswers(props) {
    return (
        <div key={props.index} className='pick-answerbox gradient-border-blue' style={props.elem === props.deepcontext.name? props.correct : props.wrong}>
            <div className='pick-answerbox-img' style={{backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${Object.values(props.context.stateValue.champions).filter((value, index) => value.name === props.elem)[0].id}.png')`, filter: props.elem === props.deepcontext.name? 'saturate(1)' : 'saturate(0)' }}></div>
            <p>{props.elem}</p>
        </div>
    )
}
