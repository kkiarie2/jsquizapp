const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector('#progressText')
const ScoreText = document.querySelector('#score')
const progressbarfull = document.querySelector('#progressbarfull')

let currrentQuestion = {}
let acceptingAnswers = true
let score = 0
let available = []
let questions = [
{
question: "In which part of the digestive system are mineral salts absorbed?",
choice1: "Mouth",
choice2: "Stomach",
choice3: "Small intestines",
choice4: "Large intestines",
answer: 3,
},

{
question: "Which one of the following is the correct order of development after fertilisation in human beings?",
choice1: "Embryo - Zygote — Foetus",
choice2: "Zygote — Foetus — Embryo",
choice3: "Zygote — Embryo - Foetus",
choice4: "Embryo — Foetus — Zygote",
answer: 1,
},
{
question: "Which one of the following is an adaptation of plants in dry areas?",
choice1: "Fewer leaves",
choice2: "Broad leaves",
choice3: "Thin cuticle",
choice4: "Many stomata",
answer: 1,
},


{
question: "The human tooth that mainly helps to tear meat from bones is",
choice1: "incisor",
choice2: "canine",
choice3: "premolar",
choice4: "molar",
answer: 1,
},

{
question: "Which one of the following instruments is used to measure two different aspects of weather?",
choice1: "Wind vane",
choice2: "Thermometer",
choice3: "Rain gauge",
choice4: "Windsock",
answer: 3,
},

{
question: "Which one of the following is a proper use of drugs?",
choice1: "Taking more dosage of prescribed medicine to heal faster.",
choice2: "Buying prescribed drugs from the pharmacy.",
choice3: "Borrowing drugs from a neighbour whenever sick.",
choice4: "Taking malaria drugs whenever you have a headache.",
answer: 2,
},

{
question: "In Kenya, rivers passing through cities are mainly polluted by:",
choice1: "industrial wastes",
choice2: "oil spillage",
choice3: "soil erosion",
choice4: "agricultural chemicals",
answer: 1,
},
{
question: "Which one of the following pairs of vaccines is administered at birth?",
choice1: "BCG and DPT.",
choice2: "DPT and measles.",
choice3: "BCG and polio.",
choice4: "Polio and measles.",
answer: 1,
},

{
question: "Which one of the following is the least effective control measure for sexually transmitted diseases among married couples?",
choice1: "Being faithful to their partners.",
choice2: "Use of sterilised personal items.",
choice3: "Testing and counselling.",
choice4: "Abstinence.",
answer: 3,
},

{
question: "Which one of the following statements is true about blood vessels?",
choice1: "Aorta has valves.",
choice2: "Vena cava has thin walls.",
choice3: "Pulmonary vein carries deoxygenated blood.",
choice4: "Pulmonary artery carries blood to the heart.",
answer: 3,
}
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
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressbarfull.style.width =`${(questionCounter/ MAX_QUESTIONS)*100}%`
    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currrentQuestion = availableQuestions[questionsIndex]
    question.innerText = currrentQuestion.question
    choices.forEach(choice=>{
        const number = choice.dataset['number']
        choice.innerText = currrentQuestion['choice' + number]

    })
    availableQuestions.splice( questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice  => {
    choice.addEventListener('click', e=>{  
    if(!acceptingAnswers) return
    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']
    let classToApply = selectedAnswer == currrentQuestion.answer ? 'correct' : 'incorrect'
    if(classToApply=== 'correct'){
        incrementScore(SCORE_POINTS)
    }
        selectedChoice.parentElement.classList.add(classToApply)
    

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)

            getNewQuestion()
        }, 1000)


    })
    
    
})

incrementScore = num => {
    score += num
    ScoreText.innerText = score
}
startGame()