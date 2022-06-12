const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('.progressText');
const scoreText = document.querySelector('#progressBarFull');
const progressBarFull = document.querySelector('#progressBarFull')


let currentQuestion = {};
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which of the following number object functions returns the value of the number?",
        choices: ["toString()", "toLocaleString()", "valueOf()"],
        answer: "valueOf()"
    },
    {
        question: "Which of the following is correct about JavaScript?", 
        choices: ["JavaScript is an Object-oriented language", "JavaScript is Assembly-language", "JavaScript is an Object-Oriented language"],
        answer:"JavaScript is an Object-Oriented language"
    },
    {
        question: "In JavaScript, what is a block statement?",
        choices: ["Conditional block", "Block that combines a number of statements into a single compund statement","Both conditional block and single statement"],
        answer: "Block that combines a number of statements into a single compund statement"
    },
    {
        question: "The 'Function' and 'Var' are known as?",
        choices: ["Keywords", "Data Types", "Declaration statements"],
        answer: "Declaration statements"
    },
    {
        question: "Which one of the following is the correct way for calling the JavaScript code",
        choices: ["Function/method", "RMI", "Trigerring event"],
        answer: "Function/method"
    },
    {
        question: "What is JavaScript?",
        choices: ["JavaScript is a scripting language used to make the website interactive", "JavaScript is an assembly language used to make the website interactive","JavaScript is a compiles language used to make the website interactive"],
        answer:"JavaScript is a compiles language used to make the website interactive"
    },{
        question: "Which one of the following symbol is used for creating comments in the JavaScript?",
        choices: ["//", "\\", "\/"],
        answer: "//"
    },
    {
        question: "Which of the following operator returns false if both values are equal?",
        choices: ["!", "!=", "!=="],
        answer:"!="
    },{
        question: "Which one of the following is known as the Equality operator, which is used to check whether two values are equal or not:",
        choices: ["&&", "===", "=="],
        answer: "=="
    },
    {
        question: "Which of the following function of the String object returns the character in the string starting at the specified position via the specified number of characters?",
        choices: ["slice()", "split()", "substr()"],
        answer:"substr()"
    },
]

const score_points = 100
const max_questions = 10

startGame = () => {
    questionCounter = 0
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter > max_questions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++ 
    progressText.innerText = `Question ${questionCounter} of ${max_questions}`
    progressBarFull.style.width = `${(questionCounter/max_questions) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.targetconst 
        const selectedAnswer = selectedChoice.dataset['number']
        
        // if correct / incorrect -- target CSS colour
        let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'
        
        // if answer is correct, increase score by 100 
        if(classToApply === 'correct') {
            incrementScore(score_points)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        },1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()