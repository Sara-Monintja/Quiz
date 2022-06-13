const initials = document.querySelector('#initials')
const saveScorebtn = document.querySelector('#saveScore')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore= localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const max_high_scores = 10

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScorebtn.disabled = !initials.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score : mostRecentScore,
        name: initials.value
    }

    highScores,push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(10)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}
