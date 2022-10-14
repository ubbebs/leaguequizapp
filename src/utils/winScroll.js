const winScroll = () => {
    document.querySelector('#win') && document.querySelector('#win').scrollIntoView({ behavior: 'smooth' })
}

export { winScroll }