const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const quitButton = document.getElementById('quit-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

startButton.addEventListener('click', startGame)

/**
 * gör så att man klicka på nästa knapp, så att den visar nästa fråga
 */
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNewQuestion()
})

quitButton.addEventListener('click', () => {
    questionContainerElement.classList.add('hide')
    startButton.classList.remove('hide')
    startButton.innerText = 'start'
    quitButton.classList.add('hide')
}) 


let shuffledQuestions
let currentQuestionsIndex


// gör så att spelet kan starta när man trycker på start knappen

function startGame() {
    startButton.classList.add('hide')
    /**
     * det här sätter frågorna så att dom kommer i en viss ordning
     */
    shuffledQuestions = questions.sort(() => Math.random() - 0)
    currentQuestionsIndex = 0
    questionContainerElement.classList.remove('hide')
    setNewQuestion()
}


function setNewQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}

function showQuestion(question) {
    questionElement.innerHTML = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    quitButton.classList.add('hide')
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        quitButton.classList.remove('hide')

    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// questions

let questions = [{
        question: 'What is 2 + 2?',
        answers: [{
                text: '4',
                correct: true
            },
            {
                text: '22',
                correct: false
            }
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [{
                text: 'Web Dev Simplified',
                correct: true
            },
            {
                text: 'Traversy Media',
                correct: true
            },
            {
                text: 'Dev Ed',
                correct: true
            },
            {
                text: 'Fun Fun Function',
                correct: true
            }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [{
                text: 'Kinda',
                correct: false
            },
            {
                text: 'YES!!!',
                correct: true
            },
            {
                text: 'Um no',
                correct: false
            },
            {
                text: 'IDK',
                correct: false
            }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [{
                text: '6',
                correct: false
            },
            {
                text: '8',
                correct: true
            }
        ]
    }
]