const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull')


let currentQuestion = {};
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which of the following number object functions returns the value of the number?",
        choice1: "toString()", 
        choice2: "toLocaleString()", 
        choice3: "valueOf()",
        answer: 3,
    },
    {
        question: "In a case, where the value of the operator is NULL , the typeof returned by the unary operator is___.", 
        choice1: "Object", 
        choice2: "Undefined", 
        choice3: "Boolean",
        answer: 1,
    },
    {
        question: "In JavaScript, what is a block statement?",
        choice1: "Conditional block", 
        choice2: "Block that combines a number of statements into a single compund statement",
        choice3: "Both conditional block and single statement",
        answer: 2,
    },
    {
        question: "The 'Function' and 'Var' are known as?",
        choice1: "Keywords", 
        choice2: "Data Types", 
        choice3: "Declaration statements",
        answer: 3,
    },
    {
        question: "Which one of the following is the correct way for calling the JavaScript code",
        choice1: "Function/method", 
        choice2: "RMI", 
        choice3: "Trigerring event",
        answer: 1,
    },
    {
        question: "What is JavaScript?",
        choice1: "JavaScript is a scripting language used to make the website interactive", 
        choice2: "JavaScript is an assembly language used to make the website interactive",
        choice3: "JavaScript is a compiled language used to make the website interactive",
        answer: 3,
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choice1: "getElementbyId()", 
        choice2: "getElementByClassName()", 
        choice3: "Both A and B",
        answer: 3,
    },
    {
        question: "Which of the following operator returns false if both values are equal?",
        choice1: "!", 
        choice2: "!=", 
        choice3:"!==",
        answer: 2,
    },
    {
        question: "Which one of the following is known as the Equality operator, which is used to check whether two values are equal or not:",
        choice1: "&&", 
        choice2: "===", 
        choice3: "==",
        answer: 3,
    },
    {
        question: "Which of the following function of the String object returns the character in the string starting at the specified position via the specified number of characters?",
        choice1: "slice()", 
        choice2: "split()", 
        choice3: "substr()",
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }
    
    questionCounter++ 
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        
        // if correct / incorrect -- target CSS colour
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        // if answer is correct, increase score by 100 
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
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