const initials = document.querySelector('#initials')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore= localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 100

finalScore.innerText = mostRecentScore

initials.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !initials.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: initials.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(10)

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('')
}
